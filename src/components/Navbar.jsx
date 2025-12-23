import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { BASE64_PLACEHOLDERS } from "../assets/placeholders";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import VerifyEmail from "./VerifyEmail";
import PhoneVerify from "./PhoneVerify";

export default function Navbar() {
  const { cart, setRoute, user, logout } = useApp();
  const [showCat, setShowCat] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [verifyUserId, setVerifyUserId] = useState(null);
  const [showPhoneVerify, setShowPhoneVerify] = useState(false);

  const categories = [
    { id: "festival", name: "Festival Candles", img: BASE64_PLACEHOLDERS[0] },
    { id: "bloom", name: "Bloom Candles", img: BASE64_PLACEHOLDERS[1] },
    { id: "jar", name: "Jar Candles", img: BASE64_PLACEHOLDERS[2] }
  ];

  const count = cart.reduce((s, it) => s + (it.qty || 0), 0);

  const handleUserClick = () => {
    if (user) {
      setRoute("account");
    } else {
      setShowLogin(true);
    }
  };

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

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenu(v => !v)}>
          {mobileMenu ? <X className="text-purple-600" /> : <Menu className="text-purple-600" />}
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          <button onClick={() => setRoute("home")} className="hover:text-purple-600">Home</button>
            
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

          <button onClick={handleUserClick} title={user ? user.name : "Login"}>
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

      {/* Mobile Menu */}
      {mobileMenu && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white p-4 flex flex-col gap-4 shadow-lg border-t"
        >
          <button onClick={() => { setRoute('home'); setMobileMenu(false); }}>Home</button>
          <button onClick={() => setShowCat(!showCat)}>Categories ▾</button>
          
          {showCat && (
            <div className="flex flex-col gap-2 ml-4">
              {categories.map(c => (
                <button key={c.id} onClick={() => { setRoute('category:' + c.name); setMobileMenu(false); }}>
                  <div className="flex items-center gap-2">
                    <img src={c.img} className="w-10 h-10 rounded" />
                    {c.name}
                  </div>
                </button>
              ))}
            </div>
          )}

          <button onClick={() => { setRoute('new'); setMobileMenu(false); }}>New Arrival</button>
          <button onClick={() => { setRoute('personalized'); setMobileMenu(false); }}>Personalized Gift</button>
          <button onClick={() => { setRoute('about'); setMobileMenu(false); }}>About Us</button>
          
          {user ? (
            <>
              <button onClick={() => { setRoute('account'); setMobileMenu(false); }}>My Account</button>
              <button onClick={() => { logout(); setMobileMenu(false); }} className="text-red-500">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => { setShowLogin(true); setMobileMenu(false); }} className="text-pink-600">Login</button>
              <button onClick={() => { setShowRegister(true); setMobileMenu(false); }} className="text-purple-600">Register</button>
            </>
          )}
        </motion.div>
      )}

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

      {/* Auth Modals */}
      {showLogin && (
        <LoginModal
          close={() => setShowLogin(false)}
          openVerify={(userId) => setVerifyUserId(userId)}
          openRegister={() => setShowRegister(true)}
        />
      )}
      
      {showRegister && (
        <RegisterModal 
          close={() => setShowRegister(false)} 
          openVerify={(userId) => setVerifyUserId(userId)}
        />
      )}
      
      {verifyUserId && (
        <VerifyEmail 
          userId={verifyUserId} 
          close={() => setVerifyUserId(null)} 
        />
      )}
      
      {showPhoneVerify && (
        <PhoneVerify 
          close={() => setShowPhoneVerify(false)} 
          onVerified={() => setShowPhoneVerify(false)}
        />
      )}
    </header>
  );
}
