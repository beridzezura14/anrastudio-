"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white z-10">
      
      {/* background glow (არ შევეხოთ ბევრს - ეს OK არის) */}
      <div className="absolute w-[450px] h-[450px] bg-sky-300/30 blur-3xl rounded-full -top-40 -left-40" />
      <div className="absolute w-[350px] h-[350px] bg-indigo-300/30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center">

        {/* 🔥 TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-bold leading-tight text-3xl sm:text-4xl md:text-6xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500">
            ციფრული პროდუქტები, რომლებიც რეალურ შედეგს ქმნის
          </span>
        </motion.h1>

        {/* 🔥 SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-slate-600 text-sm max-w-2xl"
        >
          ANRA Studio ქმნის სწრაფ, თანამედროვე და მომხმარებელზე ორიენტირებულ
          ვებსაიტებს, რომლებიც ზრდის შენს გაყიდვებს.
        </motion.p>

        {/* 🔥 BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 flex gap-4 flex-col sm:flex-row"
        >
          <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white cursor-pointer">
            შეუკვეთე
          </button>

          <button className="px-5 py-3 rounded-xl border border-sky-200 cursor-pointer">
            ჩვენი ნამუშევრები
          </button>
        </motion.div>

      </div>
    </section>
  );
}