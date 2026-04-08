"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ---------------- TYPES ----------------
type Feature = { id: string; feature: string };
type Plan = {
  id: string;
  name: string;
  subtitle: string;
  original_price: number;
  discount_price: number | null;
  popular: boolean;
  plan_features?: Feature[];
};
type DiscountSettings = {
  percent: number;
  expires_at: string | null;
  active: boolean;
};

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [discount, setDiscount] = useState<DiscountSettings | null>(null);
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 1. DATA FETCHING
  useEffect(() => {
    const fetchData = async () => {
      try {
        // გეგმები (დალაგებული რევერსულად: ახალი პირველი)
        const { data: plansData } = await supabase
          .from("plans")
          .select(`*, plan_features(id, feature)`)
          .order("created_at", { ascending: true });

        if (plansData) setPlans(plansData);

        // ფასდაკლება
        const { data: discData } = await supabase
          .from("discount_settings")
          .select("*")
          .eq("active", true)
          .maybeSingle();

        if (discData) setDiscount(discData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // მხოლოდ მას შემდეგ, რაც მონაცემები ჩამოვა, ვადასტურებთ "Mounted" სტატუსს
        // ეს აცილებს თავიდან სინქრონულ Cascading Render-ს
        setMounted(true);
      }
    };

    fetchData();
  }, []);

  // 2. COUNTDOWN LOGIC
  useEffect(() => {
    if (!discount?.expires_at) return;

    const target = new Date(discount.expires_at).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
      return true;
    };

    const isActive = updateTimer();
    if (!isActive) return;

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [discount?.expires_at]);

  const isExpired = discount?.expires_at
    ? new Date(discount.expires_at).getTime() < new Date().getTime()
    : true;

  const hasDiscount = mounted && discount && discount.percent > 0 && !isExpired;

  // Hydration-ის თავიდან ასაცილებლად
  if (!mounted) return null;

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* ... დანარჩენი UI უცვლელია ... */}
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
<<<<<<< HEAD
        <h2 className="title text-3xl md:text-5xl font-bold text-slate-800">
          პროექტის ფასები
=======
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          ჩვენი პაკეტები
>>>>>>> f660546b3ced0cbddab4c6c7d336d95dcc7ed5d6
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          აირჩეთ სასურველი პაკეთი, ჩვენ ვქმნით სრულ ციფრულ გადაწყვეტილებებს
        </p>

        {/* COUNTDOWN */}
        {hasDiscount && (
          <div className="mt-12 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 shadow-xl shadow-pink-200">
              -{discount.percent}%-იანი ფასდაკლება სრულდება
            </div>
            <div className="flex justify-center gap-4 mt-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br blur opacity-30 group-hover:opacity-60 transition" />
                  <div className="relative  backdrop-blur-xl rounded-2xl px-5 py-4 min-w-[90px] border border-white/10 shadow-2xl">
                  <div className="text-4xl font-black tabular-nums bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {String(t.value).padStart(2, "0")}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider mt-1 bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent font-bold">
                    {t.label}
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRID (Plans are already reversed from Supabase) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan) => {
            const finalPrice = hasDiscount
              ? (plan.discount_price ??
                Math.round(
                  plan.original_price * (1 - (discount?.percent || 0) / 100),
                ))
              : plan.original_price;

            return (
              <div
                key={plan.id}
                className={`relative group rounded-[2.5rem] p-8 transition-all duration-500 ${plan.popular ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white scale-105 shadow-2xl" : "bg-white border border-slate-200 hover:-translate-y-2 hover:shadow-2xl"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500  text-xs font-black px-4 py-1 rounded-full uppercase shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p
                  className={
                    plan.popular ? "text-slate-300 mt-2" : "text-slate-500 mt-2"
                  }
                >
                  {plan.subtitle}
                </p>
                <div className="mt-8">
                  {hasDiscount && (
                    <span className="text-sm line-through opacity-60 block">
                      {plan.original_price}₾
                    </span>
                  )}
                  <div className="text-5xl font-black mt-1">{finalPrice}₾</div>
                </div>
                <div className="mt-8 space-y-4 text-left">
                  {plan.plan_features?.map((f) => (
                    <div key={f.id} className="flex items-start gap-3 text-sm">
                      <Check
                        size={18}
                        className="text-green-500 shrink-0 mt-0.5"
                      />
                      <span
                        className={
                          plan.popular ? "text-slate-200" : "text-slate-600"
                        }
                      >
                        {f.feature}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className={`mt-10 w-full py-4 rounded-2xl font-bold transition-all active:scale-95 cursor-pointer ${plan.popular ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl" : "bg-slate-900 text-white hover:bg-black"}`}
                >
                  არჩევა
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
