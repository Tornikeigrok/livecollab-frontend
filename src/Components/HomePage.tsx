import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useUser } from "./InfoContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import socket from "./SocketContext";
import { apiGet, apiPost } from "../utils/api";

export const HomePage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [out, setOut] = useState(false);
  const [docCreated, setdocCreated] = useState(false);
  const [ID, setID] = useState(0);
  const {eml} = useUser();
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const [showSession, setShowSession] = useState(false);

  //for Join button
  const [join, setJoin] = useState(false);
  const [showBlur, setshowBlur] = useState(false);
  const [userId, setuserId] = useState(0);
 


  //states for displaying all documents
  const [documents, setDocuments] = useState<{ id: number; title: string; created_at: string; updated_at?: string; content?: string }[]>([]);
  const [mainError, setmainError] = useState(false);
 
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
        console.log("Error occured");
        navigate("/LoginPage");
      }
    };
    getData();
  }, []);

  const redirect = () => {
    setTimeout(() => {
      setOut(false);
      navigate("/"), Cookies.remove("token");
    }, 2000);
  };


  //Creating Document request
  const createDoc = async()=>{
    try {
        const res = await apiPost('/createDocument', {
            first: firstname,
            last: lastName,
            title: "Untitled Document",
            content: " "
        });
        const data = await res.json();
        setID(data.id);
        setdocCreated(true);
        navigate(`/DocumentPage?id=${data.id}`);
    } catch (error) {
        throw new Error("Failed to create document");
    }
  }

  //display all documents worked on
  useEffect(()=>{
  const workedOn = async()=>{
    if(!firstname || !lastName){
        return;
    }
    try {
        const res = await apiGet(`/allDocuments/first/last?first=${encodeURIComponent(firstname)}&last=${encodeURIComponent(lastName)}`);
        if (!res.ok) return;
        const data = await res.json();
        let docs = Array.isArray(data) ? data : (Array.isArray(data.documents) ? data.documents : []);
        setDocuments(docs);
    } catch (error) {
        setmainError(true);
        return;
    }
  }
    workedOn();
  }, [firstname, lastName])

  // Handle click outside for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
        setRenamingId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Delete document handler
  const handleDelete = async (id: number) => {
    try {
      await apiPost('/deleteDocument', { id });
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      setMenuOpen(null);
    } catch (error) {
      throw new Error("Failed to delete document");
    }
  };


  // Rename document handler
  const handleRename = async (id: number) => {
    try {
      await apiPost('/updateTitle', { id, title: renameValue });
      // Refetch documents to persist new title
      const res = await apiGet(`/allDocuments/first/last?first=${encodeURIComponent(firstname)}&last=${encodeURIComponent(lastName)}`);
      const data = await res.json();
      let docs = Array.isArray(data) ? data : (Array.isArray(data.documents) ? data.documents : []);
      setDocuments(docs);
      setRenamingId(null);
      setMenuOpen(null);
    } catch (error) {
      throw new Error("Failed to rename document");
    }
  };

  useEffect(() => {
    if (eml) {
      setShowSession(true);
      const timer = setTimeout(() => setShowSession(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [eml]);


  //All sockets go HERE
  const [wrongId, setwrongId] = useState(false);
  useEffect(()=>{
   socket.on('givenId', (data)=>{
    setwrongId(true);
    console.log(data.message);
   })
   //listen for success
   socket.on('joinSuccess', (data)=>{
    navigate(`/DocumentPage?id=${data.id}`);
    setwrongId(false);
   })
   //after validation, we dont longer need the validations
    return ()=>{
      socket.off('givenId');
      socket.off('joinSuccess');
    }
  }, [firstname, lastName]);


  //add the joined USer to DB --------------------------- --------------------------- ---------------------------
  const addJoin = async()=>{
    try {
        await apiPost('/docsJoin', {
            doc_id: userId,
            first: firstname,
            last: lastName
        });
    } catch (error) {
      return;
    }
  }

  //Display all joined documents
  const [joinedDocuments, setJoinedDocuments] = useState<{ doc_id: number; title: string; content?: string; created_at?: string; updated_at?: string, owner_first ? : string, owner_last ? : string, joined_at ? : string}[]>([]);
  const [ow, setOw] = useState("");
  const [ownerLast, setownerLast] = useState("");
  const [joinedAt, setjoinedAt] = useState("");
  useEffect(() => {
    const fetchJoinedDocs = async () => {
      if (!firstname || !lastName) return;
      try {
        const res = await apiGet(`/dispJoined/first/last?first=${encodeURIComponent(firstname)}&last=${encodeURIComponent(lastName)}`);
        if (!res.ok) return;
      
        const data = await res.json();
        // Handle empty array (no joined docs)
        if (Array.isArray(data) && data.length === 0) return;
        // Handle single object response
        if (data.success && data.doc_id) {
          setJoinedDocuments([data]);
          setOw(data.owner_first || 'unknown');
          setownerLast(data.owner_last || 'unknown');
          setjoinedAt(data.joined_at || "Unknow Date");
        }
      } catch (error) {
        // Silently handle errors
        return;
      }
    };
    fetchJoinedDocs();
  }, [firstname, lastName]);
  return (
    <div id="homepageAnchor" className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4 bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">To:collab.</span>
        </div>
    
        <ul className="flex items-center gap-3 sm:gap-4">
          <li className="hidden sm:flex items-center gap-2 text-sm text-stone-600">
            <span>Hello,</span>
            <span className="font-semibold text-stone-900">{firstname} {lastName}</span>
          </li>
          <li>
            <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center ring-2 ring-stone-200 ring-offset-2">
              <span className="text-white text-sm font-medium">{firstname.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}</span>
            </div>
          </li>
          <li
            onClick={() => { redirect(); setOut(true); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 cursor-pointer transition-colors text-sm"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="hidden sm:inline">Logout</span>
          </li>
        </ul>
      </header>

      {/* Logout toast */}
      <div className={`${out ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"} transition-all duration-300 fixed top-20 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-4 py-3 rounded-lg flex items-center gap-3 text-sm z-50 shadow-lg`}>
        <i className="fa-solid fa-circle-notch animate-spin"></i>
        <span>Logging out...</span>
      </div>

      <div className="relative">
        <main className={`${join ? "pointer-events-none opacity-50" : ""} transition duration-200`}>
          
          {/* Hero Section with pattern */}
          <section className="relative px-4 sm:px-8 lg:px-12 py-20 lg:py-28 border-b border-stone-200 bg-white overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-12">
              {/* Left content */}
              <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full text-sm text-stone-600 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Real-time collaboration</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
                Write together,<br />
                <span className="text-stone-400">in real-time.</span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-600 max-w-xl mb-12 leading-relaxed">
                Create documents, invite collaborators, and write together seamlessly. Simple, fast, and distraction-free.
              </p>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={createDoc}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-all hover:shadow-lg hover:shadow-stone-900/20"
                >
                  <i className="fa-solid fa-plus text-sm group-hover:rotate-90 transition-transform duration-300"></i>
                  <span>Create New Document</span>
                  <i className="fa-solid fa-arrow-right text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                </button>
                <button
                  onClick={() => setJoin(true)}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-stone-900 font-medium rounded-xl border-2 border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket text-sm"></i>
                  <span>Join with Code</span>
                </button>
              </div>
              
              {/* Quick stats */}
              <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                    <i className="fa-solid fa-bolt text-stone-600"></i>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-stone-900">Instant sync</span>
                    <span className="block text-xs text-stone-500">Changes appear live</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                    <i className="fa-solid fa-cloud-arrow-up text-stone-600"></i>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-stone-900">Auto-save</span>
                    <span className="block text-xs text-stone-500">Never lose your work</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                    <i className="fa-solid fa-lock text-stone-600"></i>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-stone-900">Secure</span>
                    <span className="block text-xs text-stone-500">Your data is safe</span>
                  </div>
                </div>
              </div>
              </div>

              {/* Right side - Document mockup */}
              <div className="hidden lg:block flex-1 max-w-md xl:max-w-lg mr-3 hover:scale-x-95 hover:-translate-x-2 transition-all duration-500">
                <div className="relative">
                  {/* Floating users indicator */}
                  <div className="absolute -top-4 -left-4 z-20 bg-white rounded-full px-3 py-2 shadow-lg  border border-stone-200 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">A</div>
                      <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">B</div>
                      <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">C</div>
                    </div>
                    <span className="text-xs text-stone-600 font-medium">3 editing</span>
                  </div>

                  {/* Main document card */}
                  <div className="bg-white rounded-2xl shadow-2xl shadow-stone-900/10 border border-stone-200 overflow-hidden">
                    {/* Document header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
                          <i className="fa-regular fa-file-lines text-white text-sm"></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900">Project Proposal</h4>
                          <p className="text-xs text-stone-500">Last edited just now</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>

                    {/* Document content mockup */}
                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <div className="h-6 bg-stone-900 rounded w-3/4"></div>
                        <div className="h-3 bg-stone-200 rounded w-full"></div>
                        <div className="h-3 bg-stone-200 rounded w-5/6"></div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="h-4 bg-stone-700 rounded w-1/2"></div>
                        <div className="h-3 bg-stone-100 rounded w-full"></div>
                        <div className="h-3 bg-stone-100 rounded w-4/5"></div>
                        <div className="h-3 bg-stone-100 rounded w-full"></div>
                      </div>

                      {/* Typing indicator with cursor */}
                      <div className="flex items-center gap-2 pt-2">
                        <div className="h-3 bg-emerald-100 rounded w-2/3 relative">
                          <div className="absolute right-0 top-0 h-full w-0.5 bg-emerald-500 opacity-75"></div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="h-4 bg-stone-700 rounded w-2/5"></div>
                        <div className="h-3 bg-stone-100 rounded w-full"></div>
                        <div className="h-3 bg-stone-100 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating notification */}
                  <div className="absolute -bottom-3 -right-3 z-20 bg-emerald-500 text-white rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
                    <i className="fa-solid fa-check text-xs"></i>
                    <span className="text-sm font-medium">Saved</span>
                  </div>
                </div>
              </div>
            </div>
          </section>



          <section className="px-4 sm:px-8 lg:px-12 py-14 lg:py-16 bg-stone-50/50">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-stone-900 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-stone-900">Your Documents</h2>
                  <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{documents.length}</span>
                </div>
                {documents.length > 0 && (
                  <button
                    onClick={createDoc}
                    className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-all shadow-sm"
                  >
                    <i className="fa-solid fa-plus text-[10px]"></i>
                    <span>New</span>
                  </button>
                )}
              </div>

              {/* Empty state */}
              {documents.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-stone-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                    <i className="fa-regular fa-folder-open text-xl text-stone-400"></i>
                  </div>
                  <h3 className="text-base font-medium text-stone-900 mb-1">No documents yet</h3>
                  <p className="text-sm text-stone-500 mb-5">Create your first document to get started</p>
                  <button
                    onClick={createDoc}
                    className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-all"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                    <span>Create Document</span>
                  </button>
                </div>
              )}

              {/* Documents list */}
              {documents.length > 0 && (
                <div className="space-y-2">
                  {documents.map((doc, i) => {
                    const formattedDate = new Date(doc.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric'
                    });
                    const hasUpdated = doc.updated_at && doc.updated_at !== doc.created_at;
                    const formattedUpdated = hasUpdated && typeof doc.updated_at === 'string'
                      ? new Date(doc.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : null;
                    return (
                      <Link
                        key={i}
                        to={renamingId === doc.id ? "#" : `/DocumentPage?id=${doc.id}`}
                        className="group relative flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all"
                      >
                        {/* Document icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center group-hover:from-stone-200 group-hover:to-stone-300 transition-all">
                          <i className="fa-regular fa-file-lines text-stone-500"></i>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {renamingId === doc.id ? (
                            <input
                              className="font-medium text-stone-900 w-full border-b border-stone-900 outline-none bg-transparent text-sm"
                              value={renameValue}
                              onChange={e => setRenameValue(e.target.value)}
                              onBlur={() => setRenamingId(null)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleRename(doc.id);
                                if (e.key === 'Escape') setRenamingId(null);
                              }}
                              autoFocus
                              onClick={e => e.preventDefault()}
                            />
                          ) : (
                            <h3 className="font-medium text-stone-900 text-sm truncate">{doc.title}</h3>
                          )}
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-stone-400">#{doc.id}</span>
                            <span className="text-stone-300">·</span>
                            <span className="text-xs text-stone-400">{formattedDate}</span>
                            {formattedUpdated && (
                              <>
                                <span className="text-stone-300">·</span>
                                <span className="text-xs text-emerald-600 font-medium">Edited</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
                            onClick={e => { e.preventDefault(); e.stopPropagation(); setRenamingId(doc.id); setRenameValue(doc.title); }}
                            title="Rename"
                          >
                            <i className="fa-solid fa-pen text-stone-400 hover:text-stone-600 text-xs transition-colors"></i>
                          </button>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                            onClick={e => { e.preventDefault(); e.stopPropagation(); handleDelete(doc.id); }}
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash text-stone-400 hover:text-red-500 text-xs transition-colors"></i>
                          </button>
                        </div>

                        {/* Arrow */}
                        <i className="fa-solid fa-chevron-right text-stone-300 text-xs group-hover:text-stone-500 group-hover:translate-x-0.5 transition-all"></i>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>


          {/* Joined Documents Section */}
          <section className="px-4 sm:px-8 lg:px-12 py-14 lg:py-16 bg-white border-t border-stone-100">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-stone-900">Shared with You</h2>
                  {joinedDocuments.length > 0 && (
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">{joinedDocuments.length} active</span>
                  )}
                </div>
              </div>

              {/* Empty state */}
              {joinedDocuments.length === 0 && (
                <div className="flex items-center gap-4 px-5 py-6 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                    <i className="fa-solid fa-users text-stone-400"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-stone-600">No collaborations yet</p>
                    <p className="text-xs text-stone-400 mt-0.5">Join a document using its ID to start collaborating with others</p>
                  </div>
                  <button
                    onClick={() => setJoin(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-all"
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                    <span>Join</span>
                  </button>
                </div>
              )}

              {/* Cards */}
              {joinedDocuments.length > 0 && (
                <div className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
                  {joinedDocuments.map((doc, i) => {
                    const joinedDate = doc.joined_at 
                      ? new Date(doc.joined_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : null;
                    return (
                      <Link
                        key={i}
                        to={`/DocumentPage?id=${doc.doc_id}`}
                        className={`group flex items-center gap-4 px-5 py-4 bg-white hover:bg-stone-50 transition-colors ${i !== joinedDocuments.length - 1 ? 'border-b border-stone-100' : ''}`}
                      >
                        {/* Document icon with badge */}
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center group-hover:from-stone-300 group-hover:to-stone-400 transition-all">
                            <i className="fa-regular fa-file-lines text-stone-600"></i>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                            <i className="fa-solid fa-link text-white text-[6px]"></i>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-stone-900 text-sm truncate">{doc.title}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-stone-400">#{doc.doc_id}</span>
                            {(ow || ownerLast) && (
                              <>
                                <span className="text-stone-300">·</span>
                                <span className="text-xs text-stone-500">by {ow} {ownerLast}</span>
                              </>
                            )}
                            {joinedDate && (
                              <>
                                <span className="text-stone-300">·</span>
                                <span className="text-xs text-stone-400">Joined {joinedDate}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Shared badge */}
                        <span className="flex-shrink-0 text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Open
                        </span>

                        {/* Arrow */}
                        <i className="fa-solid fa-chevron-right text-stone-300 text-xs group-hover:text-stone-500 group-hover:translate-x-0.5 transition-all"></i>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24 bg-stone-100/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm text-stone-600 mb-4 border border-stone-200">
                  <i className="fa-solid fa-rocket text-xs text-emerald-500"></i>
                  <span>Portfolio Project</span>
                </div>
                <h2 className="text-3xl font-bold text-stone-900 mb-3">What I built & why</h2>
                <p className="text-stone-600 max-w-2xl mx-auto">This full-stack application demonstrates my ability to build production-ready software with modern technologies and best practices.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg hover:shadow-stone-900/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-diagram-project text-emerald-600"></i>
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">Complex State Management</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">Handling real-time data synchronization across multiple clients while maintaining UI consistency and preventing race conditions.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg hover:shadow-stone-900/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-shield-halved text-blue-600"></i>
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">Secure Authentication</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">Implemented JWT-based auth flow with password hashing, protected routes, and secure session management from scratch.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-lg hover:shadow-stone-900/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-database text-purple-600"></i>
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-2">Database Design</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">Designed relational schema with PostgreSQL, handling user relationships, document ownership, and efficient queries.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack / How it works Section */}
          <section className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Left - Illustration */}
                <div className="flex-1 w-full max-w-md">
                  <div className="relative">
                    <div className="bg-stone-900 rounded-2xl p-6 text-white shadow-2xl shadow-stone-900/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="space-y-2 font-mono text-sm">
                        <div className="text-stone-400">// Real-time sync powered by</div>
                        <div><span className="text-emerald-400">Socket.IO</span> + <span className="text-blue-400">React</span></div>
                        <div className="text-stone-400 mt-4">// Backend</div>
                        <div><span className="text-yellow-400">Node.js</span> + <span className="text-cyan-400">PostgreSQL</span></div>
                        <div className="text-stone-400 mt-4">// Authentication</div>
                        <div><span className="text-pink-400">JWT</span> + <span className="text-orange-400">bcrypt</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Content */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-full text-sm text-stone-600 mb-4">
                    <i className="fa-solid fa-code text-xs"></i>
                    <span>Under the hood</span>
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900 mb-4">Modern tech stack</h2>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    Built with performance and scalability in mind using industry-standard technologies. WebSocket connections ensure instant updates across all connected clients.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
                      </div>
                      <span>WebSocket-based real-time communication</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
                      </div>
                      <span>Secure authentication with JWT tokens</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
                      </div>
                      <span>PostgreSQL for reliable data persistence</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-stone-600">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
                      </div>
                      <span>Responsive design with Tailwind CSS</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitations Notice */}
          <section className="px-4 sm:px-8 lg:px-12 py-6 bg-stone-50 border-t border-stone-200">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-start gap-3 text-sm text-stone-500">
                <i className="fa-solid fa-circle-info text-stone-400 mt-0.5"></i>
                <p>
                  <span className="font-medium text-stone-600">Current limitations:</span> Users can join one shared document at a time. There's no limit to the number of collaborators on a single document.
                </p>
              </div>
            </div>
          </section>
          

          {/* Footer */}
          <footer className="px-4 sm:px-8 lg:px-12 py-8 border-t border-stone-200 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-stone-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">T</span>
                </div>
                <div className="flex gap-1">
                <span className="font-semibold text-stone-900">To:collab</span>
                <span className="text-[10px] flex items-center">Tornike Sharikadze</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <span className="flex items-center gap-1.5"><i className="fa-solid fa-bolt text-stone-400"></i> Real-time</span>
                <span className="flex items-center gap-1.5"><i className="fa-solid fa-cloud text-stone-400"></i> Auto-save</span>
                <span className="flex items-center gap-1.5"><i className="fa-solid fa-lock text-stone-400"></i> Secure</span>
              </div>
            </div>
          </footer>
        </main>

        {/* Join Modal */}
        {join && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70">
            <div className="bg-white border border-stone-200 shadow-2xl rounded-2xl p-8 w-11/12 max-w-sm mx-auto">
              <form className="flex flex-col gap-6" onSubmit={(e)=> {e.preventDefault();  socket.emit('userJoining', {id: userId, first: firstname, last: lastName, content: ''}); addJoin()}}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-stone-900 flex items-center justify-center">
                    <i className="fa-solid fa-arrow-right-to-bracket text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Join Document</h3>
                  <p className="text-sm text-stone-500 text-center">Enter the document ID to start collaborating</p>
                </div>
                <input 
                  onChange={(e)=> setuserId(Number(e.target.value))} 
                  className="no-spinner border border-stone-300 p-4 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all w-full bg-stone-50" 
                  type="number" 
                  placeholder="Document ID" 
                  required 
                />
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl py-4 transition-colors" type="submit">
                    Join
                  </button>
                  <button className="w-full text-stone-600 font-medium hover:text-stone-900 transition-colors py-2" type="button" onClick={() => {setJoin(false); setwrongId(false)}}>
                    Cancel
                  </button>
                </div>
                {wrongId && (
                  <div className="flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 py-3 rounded-xl">
                    <i className="fa-solid fa-exclamation-circle"></i>
                    <span>Invalid ID. Try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;

