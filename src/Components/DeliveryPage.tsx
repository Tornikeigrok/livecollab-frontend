import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const DeliveryPage = () => {
  const [show, setShow] = useState(false);
  //function that runs after elems are loaded
  useEffect(() => {
    setShow(true);
  }, []);

  const location = useLocation();
  useEffect(() => {
    const res = document.getElementById(location.hash.replace("#", ""));
    if (res) {
      res.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div
      className={`transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      } bg-gray-50 min-h-screen text-gray-900 flex flex-col`}
    >
      <header className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm px-3 sm:px-8 py-2 sm:py-4 gap-2 sm:gap-0">
                            <Link to={"/"} className="flex items-center gap-2 group mb-1 sm:mb-0">
                                <span className="text-xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-1 group-hover:text-gray-600 transition-colors duration-300">
                                    Re<span className="text-gray-400">;</span>shop
                                </span>
                            </Link>
                            <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <Link
                                    to="/HomePage"
                                    className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-gray-200"
                                >
                                    <i className="fa-solid fa-tag text-[10px] sm:text-xs group-hover:rotate-12 transition-transform duration-300"></i>Shop
                                </Link>
                                <Link to={"/DeliveryPage"}>
                                <span className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 bg-gray-900 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-gray-900">
                                    <i className="fa-solid fa-truck text-[10px] sm:text-xs group-hover:-translate-x-0.5 transition-transform duration-300"></i>Delivery
                                </span>
                                </Link>
                                <Link to="/AccountPage">
                                <span className="group px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border border-gray-200">
                                    <i className="fa-solid fa-user text-[10px] sm:text-xs group-hover:scale-110 transition-transform duration-300"></i>Account
                                </span>
                                </Link>
                                <span className="group relative px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border border-gray-200">
                                    <i className="fa-solid fa-cart-shopping text-[10px] sm:text-xs group-hover:scale-110 transition-transform duration-300"></i>Cart
                                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gray-900 text-white text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">0</span>
                                </span>
                            </nav>
                        </header>
      <main
        id="deliveryAnchor"
        className="flex-1 w-full"
      >
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16 md:py-24 flex flex-col items-center justify-center text-center mb-12">
          <span className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-4 font-medium">Fast & Reliable</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">Delivery & Shipping</h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-6 px-4">We deliver worldwide with care. Track your order every step of the way.</p>
          <i className="fa-solid fa-truck-fast text-4xl text-gray-500"></i>
        </section>

        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-10 pb-16">
          {/* Delivery Options */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-3">
                <i className="fa-solid fa-box text-gray-400"></i>
                Delivery Options
              </h2>
            </div>
            <div className="overflow-x-auto p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider">
                    <th className="py-3 font-semibold">Type</th>
                    <th className="py-3 font-semibold">Estimated Time</th>
                    <th className="py-3 font-semibold">Cost</th>
                    <th className="py-3 font-semibold">Tracking</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t border-gray-100 ">
                    <td className="py-4 font-semibold">Standard</td>
                    <td className="py-4">5-7 business days</td>
                    <td className="py-4 font-semibold text-gray-900">$4.99</td>
                    <td className="py-4"><span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Yes</span></td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 font-semibold">Priority</td>
                    <td className="py-4">3-5 business days</td>
                    <td className="py-4 font-semibold text-gray-900">$8.99</td>
                    <td className="py-4"><span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Yes</span></td>
                  </tr>
                  <tr className="border-t border-gray-100 ">
                    <td className="py-4 font-semibold flex items-center gap-2">Express <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full">FASTEST</span></td>
                    <td className="py-4">1-2 business days</td>
                    <td className="py-4 font-semibold text-gray-900">$14.99</td>
                    <td className="py-4"><span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Yes</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-3">
                <i className="fa-solid fa-list-check text-gray-400"></i>
                How Delivery Works
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <span className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Order Processing</h3>
                    <p className="text-gray-600 text-sm">Orders are processed within 1 business day after payment.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <span className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tracking Number</h3>
                    <p className="text-gray-600 text-sm">You'll receive a tracking number by email as soon as your order ships.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <span className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Flexible Delivery</h3>
                    <p className="text-gray-600 text-sm">We deliver to home addresses, offices, and pickup points.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <span className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">International Shipping</h3>
                    <p className="text-gray-600 text-sm">We ship worldwide. Customs fees may apply depending on your country.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 text-center">
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">Need Help?</h2>
            <p className="text-gray-400 text-sm mb-6">Questions about your order or delivery? We're here to help.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="mailto:support@reshop.com" className="group w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-gray-900 text-white flex items-center justify-center transition-all duration-300">
                <i className="fa-solid fa-envelope group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="group w-12 h-12 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 text-white flex items-center justify-center transition-all duration-300">
                <i className="fa-brands fa-instagram group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="group w-12 h-12 rounded-full bg-white/10 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300">
                <i className="fa-brands fa-facebook group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="group w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-gray-900 text-white flex items-center justify-center transition-all duration-300">
                <i className="fa-brands fa-x-twitter group-hover:scale-110 transition-transform"></i>
              </a>
            </div>
          </section>
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
              <a href="#deliveryAnchor">
                <li className="hover:text-white cursor-pointer transition-colors">Shipping</li>
              </a>
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
export default DeliveryPage;
