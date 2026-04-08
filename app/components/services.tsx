"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Paintbrush,
  Zap,
  Settings,
  LineChart,
  QrCode,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type ServiceColor = "sky" | "indigo" | "violet" | "emerald" | "rose" | "amber";

const colors: Record<ServiceColor, string> = {
  sky: "text-sky-500 bg-sky-50",
  indigo: "text-indigo-500 bg-indigo-50",
  violet: "text-violet-500 bg-violet-50",
  emerald: "text-emerald-500 bg-emerald-50",
  rose: "text-rose-500 bg-rose-50",
  amber: "text-amber-500 bg-amber-50",
};

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
    desc: "ვაერთებთ Google Analytics-ს, რათა შეძლო მომხმარებლის ქცევის ანალიზი.",
    icon: BarChart3,
    color: "amber",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // reset state first (IMPORTANT for no flicker)
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.97,
      });

      gsap.set(".title", {
        opacity: 0,
        y: 20,
      });

      // TITLE
      gsap.to(".title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // CARDS
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // safe refresh
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 pb-24 bg-white overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="title text-3xl md:text-5xl font-bold text-slate-800">
          ჩვენი სერვისები
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          ვქმნით სრულ ციფრულ გადაწყვეტილებებს
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {services.map((s, i) => {
            const Icon = s.icon;

            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[s.color]}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-semibold text-slate-800">
                  {s.title}
                </h3>

                <p className="mt-2 text-slate-500 text-sm">
                  {s.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}