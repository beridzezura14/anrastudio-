"use client";

import { Check, Timer } from "lucide-react";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Starter Business Site",
    subtitle: "Modern Business Website",
    originalPrice: 700,
    discountPrice: 700 - (700 * 30) / 100,
    color: "from-sky-400 to-indigo-400",
    features: [
      "1-5 გვერდიანი ვებსაიტი",
      "1 წელი დომენი უფასოდ",
      "თანამედროვე responsive დიზაინი",
      "საკონტაქტო ფორმა",
      "სწრაფი performance",
      "SEO-ის საბაზისო სტრუქტურა",
    ],
  },
  {
    name: "Business + Admin Panel",
    subtitle: "Managed Website System",
    originalPrice: 900,
    discountPrice: 900 - (900 * 30) / 100,
    color: "from-indigo-400 to-violet-400",
    features: [
      "1-5 გვერდიანი ვებსაიტი",
      "1 წელი დომენი უფასოდ",
      "თანამედროვე responsive დიზაინი",
      "საკონტაქტო ფორმა",
      "სწრაფი performance",
      "ადმინ პანელი (კონტენტის მართვა)",
      "მონაცემთა ბაზის ინტეგრაცია",
      "დინამიური კონტენტი",
      "SEO-ის ოპტიმიზაცია",
    ],
    popular: true,
  },
  {
    name: "Premium Website",
    subtitle: "Animated + Admin Experience",
    originalPrice: "1400₾ – 1800₾",
    discountPrice: "980₾ – 1260₾",
    color: "from-violet-400 to-pink-400",
    features: [
      "ულიმიტო გვერდები",
      "1 წელი დომენი უფასოდ",
      "თანამედროვე responsive დიზაინი",
      "საკონტაქტო ფორმა",
      "სწრაფი performance",
      "ადმინ პანელი (კონტენტის მართვა)",
      "მონაცემთა ბაზის ინტეგრაცია",
      "დინამიური კონტენტი",
      "ანიმაციები (Framer Motion)",
      "advanced UI/UX დიზაინი",
      "ადმინ პანელი",
      "დინამიური სექციები",
      "SEO-ის ოპტიმიზაცია",
    ],
  },
];

// 🧠 countdown helper
function getTargetDate() {
  if (typeof window === "undefined") return new Date();

  const saved = localStorage.getItem("discount_end");

  if (saved) return new Date(saved);

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 30);

  localStorage.setItem("discount_end", newDate.toISOString());

  return newDate;
}

export default function Pricing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = getTargetDate();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 bg-white z-20">
      {/* glow background */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-sky-300/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-300/20 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
          ჩვენი პაკეტები
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          აირჩიე შენს ბიზნესზე მორგებული ვებსაიტის გადაწყვეტა
        </p>

        {/* COUNTDOWN PREMIUM */}
        <div className="mt-8 inline-flex flex-col items-center gap-4">
          {/* label */}
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium shadow-lg shadow-red-200">
            შეთავაზება მთავრდება
          </div>

          {/* timer cards */}
          <div className="flex gap-3 md:gap-5">
            {/* DAYS */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition" />
              <div className="relative px-5 py-4 rounded-2xl bg-white/70 backdrop-blur border border-white shadow-xl text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                  {timeLeft.days}
                </div>
                <div className="text-xs text-slate-500 mt-1">დღე</div>
              </div>
            </div>

            {/* HOURS */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-500 blur-lg opacity-40 group-hover:opacity-60 transition" />
              <div className="relative px-5 py-4 rounded-2xl bg-white/70 backdrop-blur border border-white shadow-xl text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
                  {timeLeft.hours}
                </div>
                <div className="text-xs text-slate-500 mt-1">საათი</div>
              </div>
            </div>

            {/* MINUTES */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-500 blur-lg opacity-40 group-hover:opacity-60 transition" />
              <div className="relative px-5 py-4 rounded-2xl bg-white/70 backdrop-blur border border-white shadow-xl text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text text-transparent">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs text-slate-500 mt-1">წუთი</div>
              </div>
            </div>

            {/* SECONDS */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 blur-lg opacity-40 group-hover:opacity-60 transition" />
              <div className="relative px-5 py-4 rounded-2xl bg-white/70 backdrop-blur border border-white shadow-xl text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs text-slate-500 mt-1">წამი</div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="group relative rounded-3xl border border-slate-100 bg-white/70 backdrop-blur p-6 hover:shadow-2xl hover:-translate-y-2 transition duration-500 flex flex-col h-full"
            >
              {/* popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-full z-20">
                  პოპულარული
                </div>
              )}

              {/* gradient bar */}
              <div
                className={`absolute top-0 left-0 w-[80%] ml-[10%] h-1 bg-gradient-to-r ${plan.color}`}
              />

              {/* CONTENT WRAPPER */}
              <div className="flex-1">
                {/* name */}
                <h3 className="text-xl font-semibold text-slate-800 mt-2">
                  {plan.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">{plan.subtitle}</p>

                {/* PRICE */}
                <div className="mt-6 flex items-end justify-between">
                  <div className="text-sm text-slate-400 line-through">
                    {plan.originalPrice}
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-red-500 font-medium">
                      -30% OFF
                    </div>

                    <div className="text-2xl font-bold text-slate-900">
                      {plan.discountPrice}
                    </div>
                  </div>
                </div>

                {/* features */}
                <div className="mt-5 space-y-3 text-left">
                  {plan.features.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <Check size={16} className="text-green-500 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* button (always bottom) */}
              <button className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition cursor-pointer">
                არჩევა
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
