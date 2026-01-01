import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; //used to scroll into the anchor
const faqs = [
	{
		question: "What is Re;shop?",
		answer:
			"Re;shop is your destination for curated, modern fashion. Discover unique styles, premium quality, and effortless shopping—all in one place.",
	},
	{
		question: "How fast is delivery?",
		answer:
			"We offer multiple delivery options, including express and priority, to get your order to you as quickly as possible.",
	},
	{
		question: "Can I return items?",
		answer:
			"Yes, we offer easy returns within 30 days of purchase. Please see our return policy for details.",
	},
	{
		question: "How do I contact support?",
		answer:
			"You can reach us via email, social media, or our contact form. We're here to help!",
	},
	{
		question: "Do you offer international shipping?",
		answer:
			"Yes, we ship worldwide. Shipping times and costs vary by location.",
	},
];

export const WelcomePage = () => {
	const [showArrow, setShowArrow] = useState(false);
	const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [show, setShow] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
    const [textShow, setTextShow] = useState(false);


    useEffect(()=>{
        setShow(true)
        setTextShow(true)
    }, []);

    const loc = useLocation();
    useEffect(()=>{
        if(loc.hash){ //check existence
            const res = document.getElementById(loc.hash.replace('#', ''))
            if(res){
                res.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, [loc]);
   

	return (
		<div className={`transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"} bg-gray-50 min-h-screen text-gray-900`}>
			<header className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg px-3 sm:px-8 py-2 sm:py-4 gap-2 sm:gap-0">
                            <Link to={"/"} className="flex items-center gap-2 group mb-1 sm:mb-0">
                                <span className="text-xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-1 group-hover:text-gray-600 transition-colors duration-300">
                                    Re<span className="text-gray-400">;</span>shop
                                </span>
                            </Link>
                            <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <Link
                                    to="/HomePage"
                                    className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5  text-black rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-200 hover:shadow-lg transition-all duration-300 border border-gray-900"
                                >
                                    <i className="fa-solid fa-tag text-[10px] sm:text-xs group-hover:rotate-12 transition-transform duration-300"></i>Shop
                                </Link>
                                <Link to={"/DeliveryPage"}>
                                <span className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-gray-200">
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
			<main className="relative w-full aspect-[16/9] md:aspect-[16/7] max-h-[95vh] min-h-[400px] mx-auto overflow-hidden">
				<video
					src="tbivideo.mp4"
					className="w-full h-full object-cover"
					autoPlay
					loop
					muted
					playsInline
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
				<div className={`transition-all duration-[1500ms] ${textShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} absolute inset-0 flex flex-col items-center justify-center text-center px-4`}>
					<span className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-medium">Curated Georgian Streetwear</span>
					<h1 className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-none">
						Re<span className="text-gray-400">;</span>shop
					</h1>
					<p className="text-white/70 text-sm md:text-lg max-w-md mb-8 font-light">Discover unique styles, premium quality, and effortless shopping—all in one place.</p>
					<Link
						onMouseEnter={() => setShowArrow(true)}
						onMouseLeave={() => setShowArrow(false)}
						to="/HomePage"
						className="group flex items-center gap-3 bg-white text-black px-8 py-3 md:px-10 md:py-4 text-sm md:text-base rounded-full shadow-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
					>
						Shop Now
						<i className={`fa-solid fa-arrow-right text-sm transition-transform duration-300 group-hover:translate-x-1`}></i>
					</Link>
				</div>
                <Link to="#welcomeAnchor">
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
					<i className="fa-solid fa-chevron-down text-white/60 text-xl"></i>
				</div>
                </Link>
			</main>

			{/* Featured Products Section */}
			<div className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-16">
						<span className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-2 block">Featured Collection</span>
						<h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">This Season's Best</h2>
					</div>
					
					<section id="welcomeAnchor" className="group relative flex flex-col md:flex-row items-center justify-center py-16 mb-8 rounded-3xl hover:bg-gray-50 transition-all duration-500">
						<div
							ref={ref}
							className="flex-1 flex justify-center items-center mb-8 md:mb-0"
						>
							<div className="relative">
								<div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
								<img
									src="https://www.tmena.shop/cdn/shop/files/1dfdc962c98d4e77b7325e626fe4553d.png?v=1765231574&width=2560"
									alt="Hoodie"
									className="relative w-48 sm:w-56 md:w-72 lg:w-96 rounded-2xl shadow-2xl object-cover transition-all duration-500 group-hover:scale-105"
								/>
							</div>
						</div>
						<div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3 px-4">
							<span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">#1 Hot Pick</span>
							<h2 className="text-2xl md:text-4xl font-black tracking-tight text-black">
								Tmena Hoodie of Chakrulo
							</h2>
							<p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
								The iconic hoodie, reimagined. Heavyweight cotton, oversized fit, and a statement for the season.
							</p>
							<Link to="/HomePage" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black hover:gap-4 transition-all duration-300">
								View Product <i className="fa-solid fa-arrow-right"></i>
							</Link>
						</div>
					</section>

					<section className="group relative flex flex-col md:flex-row-reverse items-center justify-center py-16 mb-8 rounded-3xl hover:bg-gray-50 transition-all duration-500">
						<div className="flex-1 flex justify-center items-center mb-8 md:mb-0">
							<div className="relative">
								<div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
								<img
									src="https://tmena.shop/cdn/shop/files/74ad28de7fd841fd98f9e7e72c3cf7f5.png?v=1764624939&width=2560"
									alt="Pant"
									className="relative w-48 sm:w-56 md:w-72 lg:w-96 rounded-2xl shadow-2xl object-cover transition-all duration-500 group-hover:scale-105"
								/>
							</div>
						</div>
						<div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right gap-3 px-4">
							<span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">#2 Trending</span>
							<h2 className="text-2xl md:text-4xl font-black tracking-tight text-black">
								Tmena Pant
							</h2>
							<p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
								Relaxed fit, premium fabric, and a unique print inspired by Tbilisi's ideas.
							</p>
							<Link to="/HomePage" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black hover:gap-4 transition-all duration-300">
								View Product <i className="fa-solid fa-arrow-right"></i>
							</Link>
						</div>
					</section>

					<section className="group relative flex flex-col md:flex-row items-center justify-center py-16 mb-8 rounded-3xl hover:bg-gray-50 transition-all duration-500">
						<div className="flex-1 flex justify-center items-center mb-8 md:mb-0">
							<div className="relative">
								<div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
								<img
									src="https://www.tmena.shop/cdn/shop/files/f087a9e69ea441c9a65dc37131d44fdd.png?v=1764741411&width=2560"
									alt="Tshirt"
									className="relative w-48 sm:w-56 md:w-72 lg:w-96 rounded-2xl shadow-2xl object-cover transition-all duration-500 group-hover:scale-105"
								/>
							</div>
						</div>
						<div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3 px-4">
							<span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">#3 Must Have</span>
							<h2 className="text-2xl md:text-4xl font-black tracking-tight text-black">
								Urban Jacket Tee
							</h2>
							<p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
								A modern classic. Lightweight, soft, and made for the city.
							</p>
							<Link to="/HomePage" className="mt-6 inline-flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300">
								Shop All Products <i className="fa-solid fa-arrow-right"></i>
							</Link>
						</div>
					</section>
				</div>
			</div>

			<footer id="faqAnchor" className="bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-200 py-20">
				<div className="max-w-4xl mx-auto px-4">
					<div className="text-center mb-12">
						<span className="text-gray-500 text-xs uppercase tracking-[0.3em] mb-2 block">Support</span>
						<h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
							Frequently Asked Questions
						</h3>
					</div>
					<div className="space-y-4">
						{faqs.map((faq, idx) => (
							<div
								key={idx}
								className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
							>
								<button
									className="flex justify-between items-center w-full p-6 text-left text-base md:text-lg font-semibold text-gray-900 focus:outline-none"
									onClick={() => setOpenFaq(openFaq !== idx ? idx : null)}
								>
									<span>{faq.question}</span>
									<span className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
										<i
											className={`fa-solid fa-chevron-down text-sm text-gray-600 transition-transform duration-300 ${
												openFaq === idx ? "rotate-180" : ""
											}`}
										></i>
									</span>
								</button>
								<div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? "max-h-40 pb-6" : "max-h-0"}`}>
									<p className="px-6 text-gray-600 text-base leading-relaxed">
										{faq.answer}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<section className="mt-16 text-center">
					<span className="text-gray-600 font-semibold text-sm uppercase tracking-widest mb-4 block">Follow us</span>
					<ul className="flex items-center gap-4 justify-center">
						<li className="cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white rounded-full bg-white w-12 h-12 flex items-center justify-center shadow-sm">
							<i className="fa-solid fa-envelope"></i>
						</li>
						<li className="cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-full bg-white w-12 h-12 flex items-center justify-center shadow-sm">
							<i className="fa-brands fa-instagram"></i>
						</li>
						<li className="cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white rounded-full bg-white w-12 h-12 flex items-center justify-center shadow-sm">
							<i className="fa-brands fa-facebook"></i>
						</li>
						<li className="cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white rounded-full bg-white w-12 h-12 flex items-center justify-center shadow-sm">
							<i className="fa-brands fa-x-twitter"></i>
						</li>
					</ul>
				</section>
			</footer>


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
export default WelcomePage;
