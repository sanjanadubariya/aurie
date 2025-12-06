import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { BASE64_PLACEHOLDERS } from "../assets/placeholders";

export default function Navbar() {
  const { cart, setRoute, favorites } = useApp();
  const [showCat, setShowCat] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(null);

  const categories = [
    { id: "festival", name: "Festival Candles", img: BASE64_PLACEHOLDERS[0] },
    { id: "bloom", name: "Bloom Candles", img: BASE64_PLACEHOLDERS[1] },
    { id: "jar", name: "Jar Candles", img: BASE64_PLACEHOLDERS[2] }
  ];

  const count = cart.reduce((s, it) => s + (it.qty || 0), 0);

  return (
    <header className="backdrop-blur bg-white/80 sticky top-0 shadow z-50 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div onClick={() => setRoute("home")} className="cursor-pointer flex items-center gap-2">
          <svg width="46" height="46">
            <circle cx="23" cy="23" r="20" fill="#FDE8FF" />
          </svg>
          <span className="text-2xl font-extrabold text-purple-700">Aurie</span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          <button onClick={() => setRoute("home")} className="hover:text-purple-600">Home</button>
        <button className="md:hidden" onClick={() => setMobileMenu(v => !v)}>{mobileMenu && (
  <motion.div className="md:hidden bg-white p-4 flex flex-col gap-4 shadow-lg">
      <button onClick={() => setRoute('home')}>Home</button>
      <button onClick={() => setShowCat(!showCat)}>Categories</button>
      
      {showCat && (
        <div className="flex flex-col gap-2 ml-4">
            {categories.map(c => (
              <button key={c.id} onClick={() => setRoute('category:' + c.name)}>
                <div className="flex items-center gap-2">
                    <img src={c.img} className="w-10 h-10 rounded" />
                    {c.name}
                </div>
              </button>
            ))}
        </div>
      )}

      <button onClick={() => setRoute('new')}>New Arrival</button>
      <button onClick={() => setRoute('personalized')}>Personalized Gift</button>
      <button onClick={() => setRoute('about')}>About Us</button>
  </motion.div>
)}
</button>
            
          {/* Categories Dropdown */}
          <div className="relative">
            <button onClick={() => setShowCat(v => !v)} className="hover:text-purple-600">
              Categories ▾
            </button>

            <AnimatePresence>
              {showCat && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute bg-white border shadow p-3 rounded-lg mt-2 z-50"
                >
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setRoute("category:" + c.name);
                        setShowCat(false);
                      }}
                      className="flex gap-2 p-2 hover:bg-pink-50 rounded-lg"
                    >
                      <img src={c.img} className="w-12 h-12 rounded" />
                      {c.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setRoute("new")}>New Arrival</button>
          <button onClick={() => setRoute("personalized")}>Personalized Gift</button>
          <button onClick={() => setRoute("about")}>About Us</button>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(v => !v)}>
            <Search className="text-purple-600 hover:scale-110 transition" />
          </button>

          <button onClick={() => setRoute("account")}>
            <User className="text-pink-600 hover:scale-110 transition" />
          </button>

          <button onClick={() => setRoute("cart")} className="relative">
            <ShoppingCart className="text-purple-600 hover:scale-110 transition" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full text-xs px-2">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="bg-pink-50 p-3 border-t flex items-center">
          <input
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
              setRoute("search:" + e.target.value);
            }}
            placeholder="Search candles..."
            className="w-full px-4 py-2 rounded-full border"
          />
        </div>
      )}
      <button onClick={() => setShowLogin(true)}>
   <User className="text-pink-600" />
</button>

{showLogin && (
  <LoginModal
    close={() => setShowLogin(false)}
    openVerify={(email)=>setVerifyEmail(email)}
  />
)}
{showRegister && <RegisterModal close={()=>setShowRegister(false)} />}
{verifyEmail && (
  <VerifyEmail email={verifyEmail} close={()=>setVerifyEmail(null)} />
)}
    </header>
  );
}
