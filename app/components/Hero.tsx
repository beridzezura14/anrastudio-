"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white z-10">

      {/* background glow */}
      <div className="absolute w-[450px] sm:w-[500px] h-[450px] sm:h-[500px] bg-sky-300/30 blur-3xl rounded-full -top-40 -left-40" />
      <div className="absolute w-[350px] sm:w-[400px] h-[350px] sm:h-[400px] bg-indigo-300/30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* container */}
      <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Title */}
        <h1 className="font-bold leading-tight flex flex-col items-center">

          {/* line 1 */}
          <span
            className={`text-3xl sm:text-4xl md:text-6xl transition-all duration-700 ease-out text-slate-800 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            ციფრული პროდუქტები,
          </span>

          {/* line 2 */}
          <span
            className={`mt-3 sm:mt-4 transition-all duration-700 ease-out delay-150 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 text-3xl sm:text-4xl md:text-6xl">
              რომლებიც რეალურ შედეგს ქმნის
            </span>
          </span>

        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-slate-600 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed">
          ANRA Studio ქმნის სწრაფ, თანამედროვე და მომხმარებელზე ორიენტირებულ ვებსაიტებს,
          რომლებიც ზრდის შენს გაყიდვებს და ბრენდის სიძლიერეს.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md">

          <a
            href="/contact"
            className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium text-sm sm:text-base shadow-md hover:opacity-90 transition text-center"
          >
            დაგვიკავშირდი
          </a>

          <a
            href="/portfolio"
            className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl border border-sky-200 text-slate-700 text-sm sm:text-base hover:bg-sky-50 transition text-center"
          >
            ჩვენი ნამუშევრები
          </a>

        </div>

        {/* small info */}
        <p className="inline-block mt-6 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs sm:text-sm">
          სწრაფი · თანამედროვე · SEO ოპტიმიზებული
        </p>

      </div>
    </section>
  );
}