
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AccountPage = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg px-3 sm:px-8 py-2 sm:py-4 gap-2 sm:gap-0">
        <Link to="/" className="flex items-center gap-2 group mb-1 sm:mb-0">
          <span className="text-xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-1 group-hover:text-gray-600 transition-colors duration-300">
            Re<span className="text-gray-400">;</span>shop
          </span>
        </Link>
        <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Link to="/HomePage" className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-gray-200">
            <i className="fa-solid fa-tag text-[10px] sm:text-xs group-hover:rotate-12 transition-transform duration-300"></i>Shop
          </Link>
          <Link to="/DeliveryPage" className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-gray-200">
            <i className="fa-solid fa-truck text-[10px] sm:text-xs group-hover:-translate-x-0.5 transition-transform duration-300"></i>Delivery
          </Link>
          <Link to="/AccountPage" className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 bg-gray-900 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-900">
            <i className="fa-solid fa-user text-[10px] sm:text-xs group-hover:scale-110 transition-transform duration-300"></i>Account
          </Link>
          <span className="group relative px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border border-gray-200">
						<i className="fa-solid fa-cart-shopping text-[10px] sm:text-xs group-hover:scale-110 transition-transform duration-300"></i>Cart
						<span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gray-900 text-white text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">0</span>
					</span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "login"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "register"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {activeTab === "login" ? (
              <form className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-gray-900 rounded" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-gray-900 font-semibold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-300 text-sm"
                  />
                </div>
                <label className="flex items-start gap-2 cursor-pointer text-sm">
                  <input type="checkbox" className="w-4 h-4 accent-gray-900 rounded mt-0.5" />
                  <span className="text-gray-600">
                    I agree to the <a href="#" className="text-gray-900 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-gray-900 font-semibold hover:underline">Privacy Policy</a>
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 text-sm font-semibold text-gray-700">
                <i className="fa-brands fa-google text-lg"></i>
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 text-sm font-semibold text-gray-700">
                <i className="fa-brands fa-facebook text-lg text-blue-600"></i>
                Continue with Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Back to shop */}
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back to Home Page
          </Link>
        </div>
      </main>

      <footer className="bg-gray-900 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        <div className="flex-1 min-w-[180px]">
          <span className="font-black text-lg tracking-tight">Re<span className="text-gray-500">;</span>shop</span>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">Curated Georgian streetwear for the modern individual.</p>
        </div>
        <div className="flex-1 min-w-[180px]">
          <span className="font-semibold text-sm uppercase tracking-widest text-gray-400">Client Services</span>
          <ul className="mt-4 flex flex-col gap-3 text-gray-300 text-sm">
            <Link to="/#faqAnchor">
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </Link>
            <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
            <Link to="/DeliveryPage#deliveryAnchor">
              <li className="hover:text-white cursor-pointer transition-colors">Shipping</li>
            </Link>
            <li className="hover:text-white cursor-pointer transition-colors">Payment</li>
          </ul>
        </div>
        <div className="flex-1 min-w-[180px]">
          <span className="font-semibold text-sm uppercase tracking-widest text-gray-400">Contact</span>
          <ul className="mt-4 flex flex-col gap-3 text-gray-300 text-sm">
            <li><a href="mailto:support@reshop.com" className="hover:text-white transition-colors">support@reshop.com</a></li>
            <li className="flex gap-4 items-center mt-2">
              <a href="#" className="hover:text-white transition-colors text-lg"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className="hover:text-white transition-colors text-lg"><i className="fa-brands fa-github"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} Re;shop. All rights reserved.</div>
    </footer>
      
    </div>
  );
};

export default AccountPage;
