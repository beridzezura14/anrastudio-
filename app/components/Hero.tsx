"use client";

import { motion } from "framer-motion";

const items = [
  "პორტფოლიო და პერსონალური ვებსაიტები",
  "ბიზნეს საინფორმაციო ვებსაიტები",
  "მენიუ ტიპის ვებსაიტები",
  "ციფრული მენიუ სისტემები",
  "პროდუქციის კატალოგის პლატფორმები",  "პორტფოლიო და პერსონალური ვებსაიტები",
  "ბიზნეს საინფორმაციო ვებსაიტები",
  "მენიუ ტიპის ვებსაიტები",
  "ციფრული მენიუ სისტემები",
  "პროდუქციის კატალოგის პლატფორმები",
  "პორტფოლიო და პერსონალური ვებსაიტები",
  "ბიზნეს საინფორმაციო ვებსაიტები",
  "მენიუ ტიპის ვებსაიტები",
  "ციფრული მენიუ სისტემები",
  "პროდუქციის კატალოგის პლატფორმები",  "პორტფოლიო და პერსონალური ვებსაიტები",
  "ბიზნეს საინფორმაციო ვებსაიტები",
  "მენიუ ტიპის ვებსაიტები",
  "ციფრული მენიუ სისტემები",
  "პროდუქციის კატალოგის პლატფორმები",

];

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-sky-300/30 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-300/30 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* HERO */}
      <div className="relative max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-bold leading-tight text-4xl sm:text-5xl md:text-6xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500">
            ციფრული პროდუქტები, რომლებიც რეალურ შედეგს ქმნის
          </span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-slate-600 text-base max-w-2xl"
        >
          ANRA Studio ქმნის სწრაფ, თანამედროვე და კონვერსიაზე ორიენტირებულ ვებსაიტებს, რომლებიც ზრდის შენს ბიზნესს.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex gap-4 flex-col sm:flex-row"
        >
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium shadow-lg hover:scale-105 transition">
            შეუკვეთე პროექტი
          </button>

          <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-500 transition">
            ჩვენი ნამუშევრები
          </button>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full mt-24 border-y border-white/20 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 overflow-hidden"
      >

        {/* fade edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-sky-500 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-violet-500 to-transparent z-10" />

        {/* moving track */}
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap py-6"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-14 px-10">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-white/80 text-lg md:text-2xl title italic font-medium cursor-default whitespace-nowrap"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}