import { Link } from "react-router";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import socket from "./SocketContext";
import { apiGet, apiPost } from "../utils/api";

export const DocumentPage = () => {
    const [docContent, setdocContent] = useState("");
    const [searchParams] = useSearchParams()
    const [updTime, setupdTime] = useState("");
    const uID = searchParams.get('id');

    const [firstname, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");

    const navigate = useNavigate();
    const [showCollabMenu, setShowCollabMenu] = useState(false);

    const [memberName, setmemberName] = useState<String[]>([]);
    const [memberLast, setmemberLast] = useState<String[]>([]);

  // Get user data for dynamic initials
  useEffect(() => {
    const getData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          navigate("/LoginPage");
          return;
        }
        const res = await apiGet("/users");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setFirstname(data.first);
        setLastname(data.last);
      } catch (error) {
        console.log("Error occurred");
        navigate("/LoginPage");
      }
    };
    getData();
  }, [uID, navigate]);

  const updateDoc = async()=>{
    try {
        await apiPost('/updateDoc', {
            content: docContent,
            id: uID,
        });
    } catch (error) {
        return;
    }
  }

  const [initialReload, setInitialReload] = useState(true);
  
  // Prevent scroll restoration and scroll to top on mount
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  //on loads always show latest changes
  useEffect(()=>{
    const showContent = async()=>{
        try {
            const res = await apiGet(`/loadContent/id?id=${uID}`);
            const data = await res.json();
            setdocContent(data.content);
            setInitialReload(false);
            // Scroll to top after content loads with delay for Quill to render
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }, 150);
        } catch (error) {
            return;
        }
    }
    showContent();
  }, [uID]) //dependency of uID so that you see correct content across different documents


  useEffect(()=>{
    if(initialReload){
      return;
    }
    //debounced timer - save to DB and emit socket
    const time = setTimeout(()=>{
      updateDoc();
      socket.emit('liveChanges', {id: uID, content: docContent, senderId: socket.id});
    }, 1500)

    return ()=> clearTimeout(time);

  }, [docContent, initialReload]);
  //update times
  const updateTime = async()=>{
    try {   
        const res = await apiPost('/updateTime', { id: uID });
        const data = await res.json();
        setupdTime(data.updated_at);
    } catch (error) {
        return;
    }
  }


  //Websocket goes here
  useEffect(()=>{
    const handleChanges = (data)=>{
      if(data.senderId !== socket.id){
        setdocContent(data.content);
      }
    }

    socket.on('tellChanges', handleChanges)

    socket.emit('userJoining', {id: Number(uID), first: firstname, last: lastName});

    socket.on('updateMembers', (data)=>{
      if(!data || !Array.isArray(data)){
        return;
      }
      const firstN = data.map((el:any)=> el.first) //extracts all the first names from array of objs
      const lastN = data.map((el:any) => el.last);
      setmemberName(firstN);
      setmemberLast(lastN);
    })
    return ()=>{
      socket.off('updateMembers');
      socket.off('tellChanges', handleChanges);
    }
  }, [uID, firstname, lastName]);

  // Helper function to get plain text and word count
  const getPlainText = (html: string) => {
    // Handle empty Quill editor content
    if (!html || html === '<p><br></p>' || html === '<p></p>') {
      return '';
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    // Remove zero-width spaces, invisible characters, and normalize whitespace
    return text.replace(/[\u200B-\u200D\uFEFF\n\r]/g, ' ').trim();
  };

  const wordCount = () => {
    const plainText = getPlainText(docContent).trim();
    // Return 0 if empty or only whitespace
    if (!plainText || plainText.length === 0) return 0;
    // Split by whitespace and filter out empty strings
    const words = plainText.split(/\s+/).filter(word => word.trim().length > 0);
    return words.length;
  };

  const charCount = () => {
    const plainText = getPlainText(docContent).trim();
    return plainText.length;
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Modern Header */}
      <header className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4 bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/HomePage">
            <button 
              onClick={() => { updateDoc(); updateTime(); }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-stone-600 text-sm"></i>
            </button>
          </Link>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
                <i className="fa-regular fa-file-lines text-white text-sm"></i>
              </div>
              <div>
                <span className="text-sm font-semibold text-stone-900 block">Document #{uID}</span>
                <span className="text-xs text-stone-500">Editing now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-700">Live</span>
          </div>

          {/* Collaborators display */}
          <div className="hidden sm:flex items-center">
            <div className="flex -space-x-2">
              {memberName.length > 0 ? memberName.slice(0, 4).map((el, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-900 text-white text-xs font-medium ring-2 ring-white hover:ring-stone-200 transition-all cursor-default"
                  title={`${el} ${memberLast[i]}`}
                >
                  {el.charAt(0).toUpperCase()}{memberLast[i]?.charAt(0).toUpperCase()}
                </div>
              )) : null}
              {memberName.length > 4 && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-200 text-stone-600 text-xs font-medium ring-2 ring-white">
                  +{memberName.length - 4}
                </div>
              )}
            </div>
            {memberName.length > 0 && (
              <span className="ml-3 text-xs text-stone-500">{memberName.length} online</span>
            )}
          </div>

          {/* Mobile collaborator icon */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setShowCollabMenu(!showCollabMenu)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <i className="fa-solid fa-users text-stone-600 text-sm"></i>
              {memberName.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {memberName.length}
                </span>
              )}
            </button>
            {showCollabMenu && (
              <div className="absolute right-0 top-12 bg-white border border-stone-200 rounded-xl shadow-xl p-4 z-50 min-w-[180px]">
                <span className="text-xs font-semibold text-stone-900 mb-3 block">Collaborators</span>
                <div className="flex flex-col gap-2.5">
                  {memberName.length > 0 ? memberName.map((el, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-900 text-white text-xs font-medium">
                        {el.charAt(0).toUpperCase()}{memberLast[i]?.charAt(0)?.toUpperCase()}
                      </div>
                      <span className="text-sm text-stone-700">{el} {memberLast[i]}</span>
                    </div>
                  )) : (
                    <span className="text-sm text-stone-400">No collaborators yet</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/HomePage">
            <button
              onClick={() => { updateDoc(); updateTime(); }}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-stone-900/20"
            >
              <i className="fa-solid fa-check text-xs"></i>
              <span className="hidden sm:inline">Save & Exit</span>
              <span className="sm:hidden">Done</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Document ID Banner - for sharing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-6">
        <div className="flex items-center justify-between bg-stone-100 border border-stone-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center">
              <i className="fa-solid fa-link text-stone-500 text-xs"></i>
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Share this document</span>
              <span className="text-sm font-mono font-semibold text-stone-900">ID: {uID}</span>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all text-stone-700 text-sm font-medium"
            onClick={() => { navigator.clipboard.writeText(uID || '') }}
          >
            <i className="fa-regular fa-copy text-xs"></i>
            <span className="hidden sm:inline">Copy ID</span>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-900">{wordCount()}</span> words
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-900">{charCount()}</span> characters
            </span>
          </div>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors text-stone-500 hover:text-stone-700 text-sm"
            onClick={() => { navigator.clipboard.writeText(getPlainText(docContent)) }}
          >
            <i className="fa-regular fa-copy text-xs"></i>
            <span className="hidden sm:inline">Copy text</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-4">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden" style={{ minHeight: 'calc(100vh - 220px)' }}>
          <ReactQuill
            theme="bubble"
            value={docContent}
            onChange={(content) => { setdocContent(content);}}
            className="h-full [&_.ql-tooltip]:z-50 [&_.ql-editing]:z-50 [&_.ql-editor]:text-stone-800 [&_.ql-editor]:text-base [&_.ql-editor]:leading-relaxed [&_.ql-editor]:px-6 [&_.ql-editor]:sm:px-10 [&_.ql-editor]:py-8 [&_.ql-editor]:min-h-[calc(100vh-220px)] [&_.ql-editor.ql-blank::before]:text-stone-300 [&_.ql-editor.ql-blank::before]:not-italic [&_.ql-editor.ql-blank::before]:left-6 [&_.ql-editor.ql-blank::before]:sm:left-10"
            style={{ minHeight: 'calc(100vh - 220px)' }}
            placeholder="Start writing your document..."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-8 pb-8">
        <div className="flex items-center justify-center gap-6 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-cloud-arrow-up text-emerald-500"></i>
            Auto-saved
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Select text to format</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-keyboard text-stone-400"></i>
            Bubble editor
          </span>
        </div>
      </footer>
    </div>
  )
}
export default DocumentPage;