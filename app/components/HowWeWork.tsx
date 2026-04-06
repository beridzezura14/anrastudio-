"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "იდეა და დაგეგმვა",
    desc: "ვუსმენთ თქვენს იდეას და ვგეგმავთ საუკეთესო ტექნიკურ გადაწყვეტას.",
    icon: Lightbulb,
  },
  {
    title: "დიზაინი",
    desc: "ვქმნით თანამედროვე, UX/UI-ზე ორიენტირებულ დიზაინს.",
    icon: PenTool,
  },
  {
    title: "დეველოპმენტი",
    desc: "ვწერთ სუფთა, სწრაფ და scalable კოდს (html, css, js, Next.js / React).",
    icon: Code2,
  },
  {
    title: "გაშვება",
    desc: "ვტესტავთ და ვუშვებთ live რეჟიმში სრულად ოპტიმიზებულ პროექტს.",
    icon: Rocket,
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.refresh();

    gsap.from(".how-title", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // 🔥 EACH STEP ANIMATION SEPARATELY
    gsap.utils.toArray<HTMLElement>(".step-card").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} className="relative py-24">

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* title */}
        <div className="text-center">
          <h2 className="how-title text-3xl md:text-5xl font-bold text-slate-800">
            როგორ ვმუშაობთ
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            მარტივი და ეფექტური პროცესი იდეიდან სრულ პროდუქტამდე
          </p>
        </div>

        {/* steps */}
        <div className="mt-16 relative">

          {/* vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-slate-200 hidden md:block"></div>

          <div className="space-y-0">

            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`step-card flex flex-col md:flex-row items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >

                  {/* content */}
                  <div className="w-full md:w-1/2 p-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100">

                      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                        <Icon className="text-indigo-500 w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-semibold text-slate-800">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-slate-500 text-sm md:text-base">
                        {step.desc}
                      </p>

                    </div>
                  </div>

                  {/* circle */}
                  <div className="hidden md:flex w-10 h-10 bg-white border-4 border-indigo-400 rounded-full z-10"></div>

                  {/* spacer */}
                  <div className="w-full md:w-1/2"></div>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}