import { useNavigate } from "react-router";

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4 bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">To:collab.</span>
        </div>
        <button 
          onClick={() => navigate("/LoginPage")}
          className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 sm:px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
        >
          <span>Get Started</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-stone-200 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-300 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-30"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="relative px-4 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full text-sm text-stone-600 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Real-time collaboration platform</span>
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-stone-900 mb-6 tracking-tight leading-[1.05] text-center">
              Write together,<br />
              <span className="text-stone-400">without limits.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-12 leading-relaxed text-center">
              Effortless collaboration for teams, students, and creators. Share ideas, draft stories, and build knowledge—no boundaries, no clutter, just pure focus.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <button 
                onClick={() => navigate("/LoginPage")}
                className="group inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-xl hover:shadow-stone-900/20 transition-all"
              >
                <span>Start Collaborating</span>
                <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button 
                onClick={() => navigate("/LoginPage")}
                className="inline-flex items-center gap-3 bg-white hover:bg-stone-50 text-stone-900 px-8 py-4 rounded-xl font-medium text-base border-2 border-stone-200 hover:border-stone-300 transition-all"
              >
                <i className="fa-solid fa-play text-xs"></i>
                <span>See how it works</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mb-20">
              <div className="text-center">
                <span className="block text-3xl sm:text-4xl font-bold text-stone-900">∞</span>
                <span className="text-sm text-stone-500">Unlimited creativity</span>
              </div>
              <div className="w-px h-12 bg-stone-200 hidden sm:block"></div>
              <div className="text-center">
                <span className="block text-3xl sm:text-4xl font-bold text-stone-900">0%</span>
                <span className="text-sm text-stone-500">Distraction</span>
              </div>
              <div className="w-px h-12 bg-stone-200 hidden sm:block"></div>
              <div className="text-center">
                <span className="block text-3xl sm:text-4xl font-bold text-stone-900">1-click</span>
                <span className="text-sm text-stone-500">To collaborate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="relative px-4 sm:px-8 lg:px-12 py-20 bg-white border-t border-stone-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Tools for thinkers & doers</h2>
              <p className="text-lg text-stone-600 max-w-xl mx-auto">From brainstorming to publishing, To:collab is your creative playground.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group relative bg-stone-50 rounded-2xl p-8 hover:bg-stone-100 transition-all duration-300 border border-stone-100 hover:border-stone-200">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <i className="fa-solid fa-bolt text-xl text-stone-700"></i>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Every keystroke appears instantly for everyone. No lag, no waiting—just flow.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative bg-stone-50 rounded-2xl p-8 hover:bg-stone-100 transition-all duration-300 border border-stone-100 hover:border-stone-200">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <i className="fa-solid fa-cloud-arrow-up text-xl text-stone-700"></i>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  Effortless Saving
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Your work is always safe. No buttons, no stress—just write and relax.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative bg-stone-50 rounded-2xl p-8 hover:bg-stone-100 transition-all duration-300 border border-stone-100 hover:border-stone-200">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <i className="fa-solid fa-lock text-xl text-stone-700"></i>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  Private by Design
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Only you and your collaborators can see your docs. Your ideas stay yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 sm:px-8 lg:px-12 py-20 bg-stone-900">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to collaborate?</h2>
            <p className="text-lg text-stone-400 mb-8">Join thousands of teams writing together in real-time.</p>
            <button 
              onClick={() => navigate("/LoginPage")}
              className="group inline-flex items-center gap-3 bg-white hover:bg-stone-100 text-stone-900 px-8 py-4 rounded-xl font-medium text-base transition-all"
            >
              <span>Get Started Free</span>
              <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 lg:px-12 py-8 bg-white border-t border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-stone-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="font-semibold text-stone-900">To:collab.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-bolt text-stone-400"></i> Real-time</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-cloud text-stone-400"></i> Auto-save</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-lock text-stone-400"></i> Secure</span>
          </div>
          <span className="text-xs text-stone-400">© {new Date().getFullYear()} To:collab.</span>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
