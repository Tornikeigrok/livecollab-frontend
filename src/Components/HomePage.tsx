import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const products = [
    {image:"https://www.tmena.shop/cdn/shop/files/1dfdc962c98d4e77b7325e626fe4553d.png?v=1765231574&width=2560", title: "Chakrulo Black Hoodie (ჩაკრულო საქართველო) ", price: 80,type:"Hoodies"},
    {image:"https://www.tmena.shop/cdn/shop/files/4306620acac045948db69f2e1c32f8bb.png?v=1766694962&width=2560",title: "White T-Shirt (წყვილი)",price: 100, type:"T-Shirts"},
    {image:"https://www.tmena.shop/cdn/shop/files/77f9a794193e4e599037ae5dc3cbee2e.png?v=1764745874&width=2560", title:"White-Red T-Shirt (ცეკვა)",price:70, type:"Shirts"},
    {image:"https://www.tmena.shop/cdn/shop/files/f087a9e69ea441c9a65dc37131d44fdd.png?v=1764741411&width=2560",title:"Georgian Warrior Hoodie",price:75, type:"Hoodies"},
    {image:"https://www.tmena.shop/cdn/shop/files/198526e1d9924c87ab245b84d666322d.png?v=1764566734&width=2560",title:"Mother of Khartli Jacket",price:110, type:"Jackets"},
    {image: "https://tmena.shop/cdn/shop/files/74ad28de7fd841fd98f9e7e72c3cf7f5.png?v=1764624939&width=2560", title:"Tmena straight leg pants", price:70, type:"Pants"},
    {image: "https://tmena.shop/cdn/shop/files/211e212bde1145869fc487cc230a21c4.png?v=1764626814&width=2560",title:"Tmena Cotton Sweatpants", price:75, type:"Pants"},
    {image:"https://tmena.shop/cdn/shop/files/abe7c083d8614f3a958628572c3f40f6.png?v=1764574068&width=2560",title:"THe man in the panther's skin", price:65, type:"T-Shirts"},
    {image:"https://tmena.shop/cdn/shop/files/e06830fee7a14632a2c488b2f48c9000.png?v=1764574557&width=2560",title:"Tmena T-shirt",price:85, type:"T-Shirts"},
    {image:"https://tmena.shop/cdn/shop/files/2217b73dcd584497b2ccfe6d6b313da3.png?v=1766694066&width=2560", title:"Tbilisi T-Shirt",price:50, type:"T-Shirts"},
    {image:"https://tmena.shop/cdn/shop/files/8b63ef1db0fb42afbcf5d68b9a841027.png?v=1764575093&width=2560", title:"Tmena Sweatshirt", price:87, type:"Shirts"},
    {image:"https://tmena.shop/cdn/shop/files/283f008aa473496ab3b30fb5dc720b7f.png?v=1764573128&width=2560",title:"Ma in panther's skin", price:105, type:"Hoodies"}
  ];
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  
  const [found, setFound] = useState(false);
  
  const priceMap =  {
    "All" : -1,
    "Under $70":[0, 70],
    "$70-$90": [70, 90],
    "$90-$110": [90, 110],
    "Above $110": [110, 1000]
  }


  function createFilters({ name, options, onClick}) {
    //Reusable function for filters
    return (
      <div className="dropdown">
        <button
          className="flex items-center border-transparent  bg-gray-300 text-gray-800 font-semibold btn btn-secondary dropdown-toggle text-xs md:text-base"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {name}
        </button>
        <ul className="dropdown-menu bg-white shadow-lg border border-gray-200">
          {options.map((el, i) => (
            <li key={i}>
              <a onClick={onClick ? ()=> onClick(el) : undefined}
                className="text-xs md:text-base dropdown-item text-gray-800 "
                href="#"
              >
                {el}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  interface grid {
    number: Number;
  }


  //header of main page
  const [userFilter, setUserFilter] = useState("All");
  const [userPrice, setUserPrice] = useState(-1);
  const [userSort, setUserSort] = useState("All");

  const [showPrice, setShowPrice] = useState("All");

  const filterLogic = products
  .filter(el =>
    (userFilter === "All" || el.type === userFilter) &&
    (userPrice === -1 || (el.price >= userPrice[0] && el.price <= userPrice[1]))
  )
  .sort((a, b) => {
    if (userSort === "Ascending") return a.price - b.price;
    if (userSort === "Descending") return b.price - a.price;
    return 0;
  });

  


  return (

    <div id='wrapper' className={`transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <header className="sticky top-0 z-30 flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg px-3 sm:px-8 py-2 sm:py-4 gap-2 sm:gap-0">
				<Link to={"/"} className="flex items-center gap-2 group mb-1 sm:mb-0">
					<span className="text-xl sm:text-3xl font-black tracking-tight text-gray-900 flex items-center gap-1 group-hover:text-gray-600 transition-colors duration-300">
						Re<span className="text-gray-400">;</span>shop
					</span>
				</Link>
				<nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto">
					<Link
						to="/HomePage"
						className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 bg-gray-900 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-700 hover:shadow-sm transition-all duration-300 border border-gray-900"
					>
						<i className="fa-solid fa-tag text-[10px] sm:text-xs group-hover:rotate-12 transition-transform duration-300"></i>Shop
					</Link>
                    <Link to={"/DeliveryPage"}>
					<span className="group flex gap-2 items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border border-gray-200">
						<i className="fa-solid fa-truck text-[10px] sm:text-xs group-hover:-translate-x-0.5 transition-transform duration-300"></i>Delivery
					</span>
                    </Link>
					<Link to="/AccountPage" className="group px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border border-gray-200">
						<i className="fa-solid fa-user text-[10px] sm:text-xs group-hover:scale-110 transition-transform duration-300"></i>Account
					</Link>
					<span className="group relative px-3 py-1.5 sm:px-4 sm:py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border border-gray-200">
						<i className="fa-solid fa-cart-shopping text-[10px] sm:text-xs group-hover:scale-110 transition-transform duration-300"></i>Cart
						<span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gray-900 text-white text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">0</span>
					</span>
				</nav>
			</header>
      <section className="relative w-full bg-gradient-to-r from-gray-100 to-gray-200 py-10 flex flex-col items-center justify-center text-center mb-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight uppercase">Discover Modern Georgian Streetwear</h1>
        <p className="text-gray-700 text-base md:text-lg max-w-xl mb-4">Curated styles, premium quality, and effortless shopping. Find your next favorite piece today.</p>
        <a href="#shopAnchor" className="inline-block bg-black text-white px-6 py-2 rounded font-semibold">Shop All</a>
      </section>

      <section className="w-11/12 max-w-7xl mx-auto mt-6 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Filters:</span>
            <div className="flex gap-2 items-center">
              {createFilters({
                name: "Price",
                options: ["All", "Under $70", "$70-$90", "$90-$110", "Above $110"],
                onClick: (el) => {
                  setUserPrice(priceMap[el]);
                  setShowPrice(el)
                }
              })}
              <span className={`${userPrice === -1 && "hidden"} whitespace-nowrap flex items-center gap-1.5 text-xs bg-gray-900 text-white px-2.5 py-1 rounded-full font-medium`}>
                {showPrice}
                <i onClick={() => setUserPrice(-1)} className="fa-solid fa-xmark hover:text-gray-300 cursor-pointer text-[10px]"></i>
              </span>
            </div>

            <div className="flex items-center gap-2" id='category'>
              {createFilters({
                name: "Category",
                options: ["All", "T-Shirts", "Shirts", "Hoodies", "Jackets", "Pants"],
                onClick: (el) => setUserFilter(el),
              })}
              <span className={`${userFilter === "All" && "hidden"} whitespace-nowrap flex items-center gap-1.5 text-xs bg-gray-900 text-white px-2.5 py-1 rounded-full font-medium`}>
                {userFilter} <span className="bg-white/20 px-1.5 rounded-full">{filterLogic.length}</span>
                <i onClick={() => setUserFilter("All")} className="fa-solid fa-xmark hover:text-gray-300 cursor-pointer text-[10px]"></i>
              </span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className={`${userSort === "All" && "hidden"} text-gray-600`}>
              <i className={`${userSort === "Ascending" ? "block" : "hidden"} fa-solid fa-arrow-up-wide-short`}></i>
              <i className={`${userSort === "Descending" ? "block" : "hidden"} fa-solid fa-arrow-down-wide-short`}></i>
            </span>
            {createFilters({
              name: "Sort",
              options: ["All", "Ascending", "Descending"],
              onClick: (el) => setUserSort(el)
            })}
          </div>
        </div>
      </section>
         

      <main id="shopAnchor" className="w-11/12 max-w-7xl mx-auto mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
      
        <div className={`${filterLogic.length === 0 ? "flex" : "hidden"} flex-col items-center col-span-full justify-center py-20 text-gray-400`}>
          <i className="fa-solid fa-shop-slash text-4xl mb-3"></i>
          <p className="text-lg font-medium mb-2">No clothes found</p>
          <button 
            onClick={() => {
              setUserFilter("All");
              setUserPrice(-1);
              setUserSort("All");
            }}
            className="text-sm text-gray-900 font-semibold px-4 py-2 border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Reset All Filters
          </button>
        </div>
        
        {filterLogic.map((el, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            <div className="relative overflow-hidden bg-gray-50">
              <img 
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                src={el.image} 
                alt={el.title} 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-gray-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {el.type}
              </span>
              <button className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-900 hover:text-white shadow-lg">
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 leading-snug mb-2 group-hover:text-gray-600 transition-colors duration-300">
                {el.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${el.price}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Free Shipping
                </span>
              </div>
            </div>
          </div>
        ))} 
      </main>


      <footer className="mt-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <span className="text-2xl font-black tracking-tight flex items-center gap-1">
                Re<span className="text-gray-500">;</span>shop
              </span>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Modern Georgian streetwear for the bold and expressive.
              </p>
            </div>
            <div>
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-300">Support</span>
              <ul className="mt-4 flex flex-col gap-2 text-gray-400 text-sm">
                <Link to="/#faqAnchor">
                  <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
                </Link>
                <li className="hover:text-white transition-colors cursor-pointer">Track Order</li>
                <Link to="/DeliveryPage#deliveryAnchor">
                  <li className="hover:text-white transition-colors cursor-pointer">Shipping</li>
                </Link>
                <li className="hover:text-white transition-colors cursor-pointer">Returns</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-300">Contact</span>
              <ul className="mt-4 flex flex-col gap-2 text-gray-400 text-sm">
                <li>support@reshop.com</li>
                <li>+995 555 123 456</li>
                <li>Tbilisi, Georgia</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-300">Follow Us</span>
              <div className="mt-4 flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                  <i className="fa-brands fa-facebook-f text-sm"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                  <i className="fa-brands fa-instagram text-sm"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                  <i className="fa-brands fa-x-twitter text-sm"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
                  <i className="fa-brands fa-github text-sm"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Re;shop. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default HomePage;
