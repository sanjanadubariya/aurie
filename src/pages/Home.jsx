import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { BASE64_PLACEHOLDERS } from "../assets/placeholders";
import { currency } from "../data/helpers";

export default function Home() {
  const { products, addToCart, setRoute, favorites, toggleFav } = useApp();
  const featured = products.slice(0, 6);

  return (
    <div className="space-y-10">

      {/* HERO */}
      <motion.section
        className="rounded-3xl p-10 bg-gradient-to-r from-[#FFE8ED] via-[#FFF4F7] to-[#FFEDEF] shadow-xl"
      >
        <div className="md:flex md:items-center md:gap-10">
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-[#E05B75]">
              Aurie — Handcrafted Candles
            </h1>

            <p className="mt-3 text-gray-700 max-w-xl">
              Delicate, long-burning candles inspired by nature.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setRoute("category:Festival Candles")}
                className="px-6 py-3 rounded-full bg-[#FF7B8A] text-white shadow-md"
              >
                Shop Festival
              </button>

              <button
                onClick={() => setRoute("personalized")}
                className="px-6 py-3 rounded-full bg-white border border-pink-200"
              >
                Create Gift
              </button>
            </div>
          </div>

          <img
            src={BASE64_PLACEHOLDERS[0]}
            className="rounded-2xl shadow-lg mt-6 md:mt-0 md:w-1/3"
          />
        </div>
      </motion.section>

      {/* FEATURED */}
      <section>
        <h2 className="text-xl font-semibold mb-4">New Arrivals</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map(p => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
            >
              <img src={p.images[0]} className="rounded-2xl shadow-lg max-w-full w-full h-auto object-contain overflow-hidden" />
              <div className="p-4">
                <div className="font-semibold">{p.title}</div>

                <div className="mt-2 flex justify-between items-center">
                  <button
                    onClick={() => toggleFav(p.id)}
                    className={`text-xl ${
                      favorites.includes(p.id) ? "text-pink-500" : "text-gray-300"
                    }`}
                  >
                    ♥
                  </button>

                  <div className="font-bold text-pink-600">{currency(p.price)}</div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => addToCart(p)}
                    className="px-3 py-1 bg-pink-500 text-white rounded-full"
                  >
                    Add
                  </button>

                  <button
                    onClick={() => setRoute("product:" + p.id)}
                    className="text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personalized section */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-lg">Personalized Gift</h3>
        <p className="text-gray-600 text-sm mt-2">
          Create a custom candle with engraved message.
        </p>

        <button
          onClick={() => setRoute("personalized")}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full"
        >
          Create Gift
        </button>
      </section>
    </div>
  );
}
