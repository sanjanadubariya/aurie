import React from "react";
import { AppProvider, useApp } from "./context/AppContext";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Flash from "./components/Flash";
import Footer from "./components/Footer";
import Router from "./router/Router";

function AppLayout() {
  const { flash } = useApp();

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FFE6EB] via-[#FFF5F8] to-[#FFECEF] font-['Fredoka'] text-gray-800">
      <TopBar />
      <div className="container mx-auto px-4 max-w-6xl">
        <Navbar />
        <main className="mt-4">
          {flash && <Flash msg={flash} />}
          <Router />
        </main>
        <Footer />
      </div>

    </div>
  );
}


export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}
