"use client";

import { Paintbrush, Zap, Settings, LineChart, QrCode, BarChart3 } from "lucide-react";

const services = [
  {
    title: "დახვეწილი დიზაინი",
    desc: "ვქმნით თანამედროვე, ესთეტიკურ და მომხმარებელზე ორიენტირებულ დიზაინს.",
    icon: Paintbrush,
    color: "sky",
  },
  {
    title: "სისწრაფე",
    desc: "ჩვენ დაგიმზადებთ თქვენს ციფრულ პროდუქტს უსწრაფესად.",
    icon: Zap,
    color: "indigo",
  },
  {
    title: "ტექნიკური მხარდაჭერა",
    desc: "საიტის მუდმივი განახლება და უსაფრთხოება.",
    icon: Settings,
    color: "violet",
  },
  {
    title: "SEO ოპტიმიზაცია",
    desc: "Google ranking-ის გაუმჯობესება და მეტი მომხმარებელი.",
    icon: LineChart,
    color: "emerald",
  },
  {
    title: "QR მენიუ",
    desc: "რესტორნებისთვის და ბიზნესებისთვის QR კოდზე დაფუძნებული ციფრული მენიუ.",
    icon: QrCode,
    color: "rose",
  },
  {
  title: "Google Analytics ინტეგრაცია",
  desc: "ვაერთებთ Google Analytics-ს, რათა შეძლო მომხმარებლის ქცევის ანალიზი და ბიზნესის ზრდა მონაცემებზე დაყრდნობით.",
  icon: BarChart3,
  color: "amber",
}
];

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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                className="group p-6 md:p-8 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur hover:shadow-xl hover:-translate-y-1 transition"
              >

                {/* icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                  bg-${service.color}-50 group-hover:bg-${service.color}-100 transition`}
                >
                  <Icon className={`text-${service.color}-500 w-6 h-6`} />
                </div>

                {/* title */}
                <h3 className="text-xl font-semibold text-slate-800">
                  {service.title}
                </h3>

                {/* desc */}
                <p className="mt-2 text-slate-500 text-sm md:text-base leading-relaxed">
                  {service.desc}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}