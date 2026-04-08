"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("id", { ascending: false });

      if (!error) setProjects(data || []);
    };
    fetchProjects();
  }, []);

  useLayoutEffect(() => {
    if (!projects.length || !trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // ჰორიზონტალური სქროლი მხოლოდ Desktop-ზე (1024px+)
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth * 0.5}`, 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, [projects]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-24 z-30"
    >
      {/* ფონის დეკორაცია */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none" />

      {/* სათაური */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col items-center text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          ჩვენი ნამუშევრები
        </h2>
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          გაეცანით ჩვენს ბოლო პროექტებს. თითოეული მათგანი შექმნილია უახლესი ტექნოლოგიების გამოყენებით.
        </p>
      </div>

  
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:flex-nowrap gap-8 px-6 lg:px-0 items-center lg:items-start will-change-transform lg:w-max relative z-10"
      >
        {/* მარცხენა დაშორება მხოლოდ დესკტოპზე */}
        <div className="hidden lg:block min-w-[10vw] h-10 flex-shrink-0" />

        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card group relative z-30 w-full max-w-[450px] lg:min-w-[550px] 2xl:min-w-[850px]  flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* IMAGE AREA */}
            <div className="h-64 md:h-80 2xl:h-120 overflow-hidden relative">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover lg:group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Overlay: მხოლოდ დესკტოპზე ჩნდება Hover-ისას */}
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
              
              {/* მობილურზე ნაზი გრადიენტი, რომ ტექსტი იკითხებოდეს თუ სურათზე დაადებ */}
              <div className="lg:hidden absolute inset-0 bg-black/5" />
            </div>

            {/* CONTENT AREA */}
            {/* lg:absolute - დესკტოპზე სურათზეა ზემოდან 
                lg:opacity-0 - დესკტოპზე თავიდან დამალულია
                relative - მობილურზე ჩვეულებრივ სურათის ქვემოთაა 
            */}
            <div className="relative p-6 lg:absolute lg:bottom-0 lg:left-0 lg:w-full lg:p-8 lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 ease-out z-20">
              
              {/* სათაური: მობილურზე შავია, დესკტოპზე თეთრი (Overlay-ს გამო) */}
              <h3 className="text-2xl font-bold text-slate-900 lg:text-white drop-shadow-sm">
                {project.title}
              </h3>

              {/* აღწერა */}
              <p className="mt-2 text-sm text-slate-600 lg:text-white/80 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* თეგები */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-slate-100 lg:bg-white/20 text-slate-600 lg:text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* ბმული */}
              {project.link && (
                <div className="mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 lg:text-white hover:gap-4 transition-all"
                  >
                    ნახვა <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="w-full xl:mt-28 2xl:mt-45 max-w-[400px] flex-shrink-0 order-2 lg:order-none">
          <a
            href="/projects"
            className="group relative flex items-center justify-center h-full min-h-[120px] rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-indigo-50 transition-all duration-500"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-600 transition">
                სრულად ნახვა
              </span>

              <div className="flex items-center gap-2 text-indigo-600 group-hover:gap-4 transition-all duration-300">
                <span className="font-semibold">გადასვლა</span>
                <ExternalLink size={18} />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 text-slate-300 group-hover:text-indigo-400 transition">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
        
        {/* მარჯვენა დაშორება მხოლოდ დესკტოპზე */}
        <div className="hidden lg:block min-w-[8vw] h-10 flex-shrink-0" />
      </div>
    </section>
  );
}