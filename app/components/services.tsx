"use client";

import { Paintbrush, Zap, Settings, LineChart } from "lucide-react";

export default function Services() {
  return (
    <section className="relative py-24 bg-white">

      {/* glow */}
      <div className="absolute top-40 left-[-120px] w-[400px] h-[400px] bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
          ჩვენი სერვისები
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
          ვქმნით სრულ ციფრულ გადაწყვეტილებებს, რომლებიც ეხმარება თქვენს ბიზნესს ზრდაში
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div className="group p-6 md:p-8 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky-100 transition">
              <Paintbrush className="text-sky-500 w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              დახვეწილი დიზაინი
            </h3>

            <p className="mt-2 text-slate-500 text-sm md:text-base leading-relaxed">
              ვქმნით თანამედროვე, ესთეტიკურ და მომხმარებელზე ორიენტირებულ დიზაინს.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 md:p-8 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition">
              <Zap className="text-indigo-500 w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              სისწრაფე
            </h3>

            <p className="mt-2 text-slate-500 text-sm md:text-base leading-relaxed">
              ოპტიმიზებული კოდი და მაღალი performance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 md:p-8 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition">
              <Settings className="text-violet-500 w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              ტექნიკური მხარდაჭერა
            </h3>

            <p className="mt-2 text-slate-500 text-sm md:text-base leading-relaxed">
              საიტის მუდმივი განახლება და უსაფრთხოება.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group p-6 md:p-8 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition">

            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition">
              <LineChart className="text-emerald-500 w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              SEO ოპტიმიზაცია
            </h3>

            <p className="mt-2 text-slate-500 text-sm md:text-base leading-relaxed">
              Google ranking-ის გაუმჯობესება და მეტი მომხმარებელი.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}