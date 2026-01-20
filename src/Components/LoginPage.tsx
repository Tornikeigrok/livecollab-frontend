import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "./InfoContext";
import Cookies from "js-cookie";
import { apiGet, apiPost } from "../utils/api";

function LoginPage() {
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [tokenNotFound, setTokenNotFound] = useState(false);
  const [tokenErr, setTokenErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  //for refresh
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setTokenNotFound(true);
        // Don't redirect - user is on login page to log in
        return;
      }
      try {
        const res = await apiGet("/users");
        const data = await res.json();
        setFirstname(data.first);
        setLastname(data.last);
        // User is already logged in, redirect to HomePage
        navigate("/HomePage");
      } catch (error) {
        setTokenErr(true);
        Cookies.remove("token");
        return;
      }
    };
    checkToken();
  }, []);

  const [loginU, setLoginU] = useState("");
  const [loginP, setLoginP] = useState("");
  //main guy
  const [correct, setCorrect] = useState(false);
  const [started, setStarted] = useState(false);
  const [info, setInfo] = useState(false);
  const [loginShake, setLoginShake] = useState(false);
  const [none, setNone] = useState(false);
  const [spin, setSpin] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regCorrect, setRegCorrect] = useState(false);
  const [alreadyEmail, setAlreadyEmail] = useState(false);
  const [wrongPas, setWrongPas] = useState(false);
  const [shake, setShake] = useState(false);
  const [regFirst, setRegFirst] = useState("");
  const [regLast, setRegLast] = useState("");
  const [regSpin, setRegSpin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  //forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLast, setForgotLast] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");

  const [forgot_pass_mismatch, setForgot_pass_mismatch] = useState(false);
  const [passChanged, setPassChanged] = useState(false);
  const [forgotError, setForgotError] = useState(false);
  const [lastNotFound, setLastNotFound] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [registerEmail, setregisterEmail] = useState(false);

  const { setEml } = useUser();
 
  const timer = () => {
    setTimeout(() => {
      navigate("/HomePage");
      setRegEmail("");
      setRegPassword("");
      setRegConfirm("");
    }, 1500);
  };
  const expire = ()=>{
    setTimeout(()=>{
        setEml(true);
    }, 2000)
    setTimeout(()=>{
        setEml(false);
    }, 5000)
  }
  const validate = async ({ email: user, password: pass }) => {
    let error = false;
    try {
      setSpin(true);
      const res = await apiPost("/authenticate", {
        email: user,
        password: pass,
      });
      if(res.status === 400){
          setregisterEmail(true);
      }

      const data = await res.json();
      setStarted(true);
    
      if (data.success) {
        Cookies.set("token", data.token, { expires: 1 });
        setCorrect(true);
        error = false;
        setNone(false);
        setregisterEmail(false);
        timer();
        setSpin(false);
        checkCookie();
        expire();

      } else {
        setCorrect(false);
        error = true;
        setSpin(false);
        // Only show 'Please Register' if backend says user not found
        if (data.error === "user_not_found") {
          setNone(true);
        } else {
          setNone(false);
        }
      }
      setEml(user);
    } catch (error) {
      console.error(error);
      error = true;
    }
    if (error) {
      setLoginShake(true);
      setTimeout(() => setLoginShake(false), 500);
    }

  };

  const moveToLogin = () => {
    setTimeout(() => {
      setActiveTab("login");
      setStarted(false);
      setCorrect(false);
      setNone(false);
    }, 1500);
  };

  const validateRegister = async (e) => {
    e.preventDefault();
    let error = false;
    if (regPassword !== regConfirm) {
      setRegConfirm("");
      setWrongPas(true);
      setRegCorrect(false);
      error = true;
    } else {
      setWrongPas(false);
    }
    try {
      if (!error) {
        setRegSpin(true);
        const res = await apiPost("/register", {
          email: regEmail,
          password: regPassword,
          first: regFirst,
          last: regLast,
        });
        const data = await res.json();
        if (data.success) {
          setRegCorrect(true);
          setAlreadyEmail(false);
          setregisterEmail(false);
          moveToLogin();
          setRegSpin(false);
        } else {
          setRegCorrect(false);
          setAlreadyEmail(true);
          error = true;
          setRegSpin(false);
        }
      }
    } catch (error) {
      console.error(error);
      error = true;
    }
    if (error) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleShowForgot = () => {
    setShowForgot(true);
    setStarted(false);
    setCorrect(false);
    setNone(false);
    setLoginShake(false);
    setWrongPas(false);
    setAlreadyEmail(false);
    setRegCorrect(false);
    setShake(false);
    setPassChanged(false);
    setForgot_pass_mismatch(false);
    setForgotError(false);
  };
  const handleBackFromForgot = () => {
    setShowForgot(false);
    setStarted(false);
    setCorrect(false);
    setNone(false);
    setLoginShake(false);
    setWrongPas(false);
    setAlreadyEmail(false);
    setRegCorrect(false);
    setShake(false);
    setPassChanged(false);
    setForgot_pass_mismatch(false);
    setForgotError(false);
  };

  //reset password request
  const reset = async (e) => {
    e.preventDefault();
    if (newPass !== confNewPass) {
      setForgot_pass_mismatch(true);
      setNoEmail(false);
      setLastNotFound(false);
      return;
    }
    try {
      const res = await apiPost("/resetpassword", {
        email: forgotEmail,
        last: forgotLast,
        password: newPass,
      });
      const data = await res.json();
      if (data.status === 400) {
        setNoEmail(true);
        setLastNotFound(false);
        setForgot_pass_mismatch(false);
        return;
      }
      if (data.status === 401) {
        setLastNotFound(true);
        setNoEmail(false);
        setForgot_pass_mismatch(false);
        return;
      }
      if (data.success) {
        setPassChanged(true);
        setLastNotFound(false);
        setNoEmail(false);
        setForgot_pass_mismatch(false);
        setTimeout(() => {
          setActiveTab("login");
          setShowForgot(false);
        }, 1500);
      } else {
        setForgotError(true);
        setLastNotFound(false);
        setNoEmail(false);
      }
    } catch (error) {
      setForgotError(true);
      setLastNotFound(false);
      setNoEmail(false);
    }
  };

  const checkCookie = async () => {
    try {
      const res = await apiGet("/users");
      const data = await res.json();
      setEml(data.email);
    } catch (error) {
      setEmailErr(true);
      return;
    }
  };

  const [show, setShow] = useState(false);
  useEffect(()=>{
   requestAnimationFrame(()=>{
     setShow(true);
   });
  },[])
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Demo credentials banner for recruiters */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-white text-sm">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-user-tie text-xs"></i>
            <span className="font-medium">Demo Account:</span>
          </span>
          <span className="flex items-center gap-3 font-mono text-emerald-100">
            <span>demopass@gmail.com</span>
            <span className="text-emerald-300">|</span>
            <span>Demo1234!</span>
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4 bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">To:collab.</span>
        </Link>
        <ul className="flex items-center gap-3">
          <Link
            className={`flex gap-2 items-center px-3 py-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors text-sm ${
              !correct ? "pointer-events-none opacity-50" : ""
            }`}
            to={"/HomePage"}
          >
            <i className="fa-solid fa-house text-sm"></i>
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <span className="flex items-center relative">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
              onMouseEnter={() => setInfo(true)}
              onMouseLeave={() => setInfo(false)}
            >
              <i className="fa-regular fa-circle-question text-lg text-stone-400 hover:text-stone-600 transition-colors"></i>
            </button>
            <span
              className={`absolute right-0 top-12 bg-white border border-stone-200 shadow-xl rounded-xl px-4 py-3 text-xs text-stone-600 z-20 transition-all duration-200 ${
                info ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ minWidth: "200px" }}
            >
              Sign in to access your dashboard
            </span>
          </span>
        </ul>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Brand & Features */}
        <div className={`relative w-full lg:w-1/2 bg-stone-900 flex items-center justify-center p-8 lg:p-16 overflow-hidden transition-all duration-1000 ${
          show ? "opacity-100 translate-x-0" : "opacity-0 lg:-translate-x-full"
        }`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-700 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-40"></div>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm text-stone-300 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>Trusted by creators worldwide</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Your ideas deserve<br />
              <span className="text-stone-400">a better home.</span>
            </h1>
            <p className="text-base lg:text-lg text-stone-400 mb-10 leading-relaxed">
              Stop juggling tabs and tools. To:collab brings your team's writing into one beautiful, focused space.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-feather text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Distraction-free writing</h3>
                  <p className="text-xs text-stone-500">Clean interface that lets you focus</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-users text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Join anyone instantly</h3>
                  <p className="text-xs text-stone-500">Share a code, start collaborating</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-shield-halved text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Your data, your control</h3>
                  <p className="text-xs text-stone-500">Private and secure by default</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-stone-50 transition-all duration-1000 ${
          show ? "opacity-100 translate-x-0" : "opacity-0 lg:translate-x-full"
        }`}>
          <div className="max-w-md w-full">
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                {showForgot ? "Reset your password" : activeTab === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-stone-500 text-sm">
                {showForgot 
                  ? "We'll help you get back in" 
                  : activeTab === "login" 
                  ? "Sign in to continue to your workspace" 
                  : "Start collaborating using To:collab"}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-stone-100">
                <button
                  onClick={() => { setActiveTab("login"); setShowForgot(false); }}
                  className={`flex-1 py-4 text-sm font-semibold transition-all ${
                    activeTab === "login" && !showForgot
                      ? "text-stone-900 bg-white border-b-2 border-stone-900"
                      : "text-stone-400 hover:text-stone-600 bg-stone-50"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setActiveTab("register"); setShowForgot(false); }}
                  className={`flex-1 py-4 text-sm font-semibold transition-all ${
                    activeTab === "register"
                      ? "text-stone-900 bg-white border-b-2 border-stone-900"
                      : "text-stone-400 hover:text-stone-600 bg-stone-50"
                  }`}
                >
                  Create Account
                </button>
              </div>

            <div
              className={`relative ${
                activeTab === "register" || showForgot ? "min-h-[660px]" : "min-h-[400px]"
              }`}
            >
              <div className={`${showForgot && "min-h-[580px]"}`}></div>

              {/* LOGIN Section */}
              <div
                className={`absolute top-0 left-0 w-full transition-transform duration-300 ${
                  activeTab === "login" ? "translate-x-0" : "-translate-x-full"
                } z-10`}
              >
                {!showForgot ? (
                  <form
                    onSubmit={(e) => {
                      validate({ email: loginU, password: loginP });
                      e.preventDefault();
                    }}
                    className={`space-y-5 p-6 sm:p-8 ${
                      loginShake ? "animate-shake" : ""
                    }`}
                    style={{
                      animationDuration: "0.4s",
                      animationTimingFunction: "ease-in-out",
                    }}
                  >
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        onChange={(e) => setLoginU(e.target.value)}
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Password
                      </label>
                      <input
                        onChange={(e) => setLoginP(e.target.value)}
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-stone-900 rounded"
                        />
                        <span className="text-stone-500">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleShowForgot}
                        className="text-stone-900 font-semibold hover:underline bg-transparent border-none p-0"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-semibold hover:bg-stone-800 transition-colors"
                    >
                      {spin ? <i className="fa-solid fa-spinner animate-spin"></i> : "Sign In"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={reset} className="space-y-4 p-6 sm:p-8">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i className="fa-solid fa-key text-stone-600"></i>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900">Reset Password</h3>
                      <p className="text-xs text-stone-500">Enter your email and last name to verify</p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        required
                        onChange={(e) => setForgotEmail(e.target.value)}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        required
                        onChange={(e) => setForgotLast(e.target.value)}
                        type="text"
                        placeholder="Your last name"
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        New Password
                      </label>
                      <input
                        required
                        onChange={(e) => setNewPass(e.target.value)}
                        type="password"
                        placeholder="New password"
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                        autoComplete="new-password"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Confirm Password
                      </label>
                      <input
                        required
                        onChange={(e) => setConfNewPass(e.target.value)}
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleBackFromForgot}
                        className="w-1/3 bg-stone-100 text-stone-700 py-3 rounded-xl font-semibold hover:bg-stone-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-stone-900 text-white py-3 rounded-xl font-semibold hover:bg-stone-800 transition-colors"
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className="flex items-center justify-center w-full min-h-[36px]">
                      {passChanged ? (
                        <span className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                          <i className="fa-solid fa-circle-check"></i> Password updated successfully!
                        </span>
                      ) : forgot_pass_mismatch ? (
                        <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                          <i className="fa-solid fa-circle-exclamation"></i> Passwords don't match
                        </span>
                      ) : forgotError ? (
                        <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                          <i className="fa-solid fa-circle-exclamation"></i> Something went wrong
                        </span>
                      ) : lastNotFound ? (
                        <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                          <i className="fa-solid fa-circle-exclamation"></i> Last name not found
                        </span>
                      ) : noEmail ? (
                        <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                          <i className="fa-solid fa-circle-exclamation"></i> Email not registered
                        </span>
                      ) : null}
                    </div>
                  </form>
                )}

                <div className="flex items-center justify-center flex-col gap-2 pb-6">
                  {!registerEmail && !showForgot &&
                    started &&
                    (correct ? (
                      <span className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                        <i className="fa-solid fa-circle-check"></i> Welcome back!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                        <i className="fa-solid fa-circle-exclamation"></i> Invalid credentials
                      </span>
                    ))}
                  {!showForgot && none && (
                    <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                      <i className="fa-solid fa-circle-exclamation"></i> Account not found
                    </span>
                  )}
                  {registerEmail && (
                    <span className="flex items-center justify-center text-red-500 text-sm">
                      <i className="fa-solid fa-circle-exclamation mr-2"></i>
                      Email not found. Please create an account.
                    </span>
                  )}
                </div>
              </div>

              {/* REGISTER Section */}
              <div
                className={`absolute top-0 left-0 w-full transition-transform duration-300 ${
                  activeTab === "register"
                    ? "translate-x-0"
                    : "translate-x-full"
                } z-10`}
              >
                <form
                  onSubmit={validateRegister}
                  className={`space-y-4 p-6 sm:p-8 ${
                    shake ? "animate-shake" : ""
                  }`}
                  style={{
                    animationDuration: "0.4s",
                    animationTimingFunction: "ease-in-out",
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        onChange={(e) => setRegFirst(e.target.value)}
                        required
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        onChange={(e) => setRegLast(e.target.value)}
                        required
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <input
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Confirm Password
                    </label>
                    <input
                      onChange={(e) => setRegConfirm(e.target.value)}
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-sm"
                    />
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer text-sm pt-1">
                    <input
                      required
                      type="checkbox"
                      className="w-4 h-4 accent-stone-900 rounded mt-0.5"
                    />
                    <span className="text-stone-500">
                      I agree to the{" "}
                      <a href="#" className="text-stone-900 font-semibold hover:underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-stone-900 font-semibold hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-semibold hover:bg-stone-800 transition-colors"
                  >
                    {regSpin ? <i className="fa-solid fa-spinner animate-spin"></i> : "Create Account"}
                  </button>
                  <div className="flex items-center justify-center min-h-[36px]">
                    {wrongPas ? (
                      <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                        <i className="fa-solid fa-circle-exclamation"></i> Passwords don't match
                      </span>
                    ) : alreadyEmail ? (
                      <span className="flex items-center gap-2 text-red-500 font-medium text-sm">
                        <i className="fa-solid fa-circle-exclamation"></i> Email already registered
                      </span>
                    ) : regCorrect ? (
                      <span className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                        <i className="fa-solid fa-circle-check"></i> Account created! Redirecting...
                      </span>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 lg:px-12 py-6 bg-white border-t border-stone-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-stone-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="font-semibold text-stone-700">To:collab.</span>
          </div>
          <span className="text-xs text-stone-400">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
