"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("id", { ascending: true });

      if (!error) setProjects(data || []);

      setLoading(false);
    };

    fetchProjects();
  }, []);

  // 🔥 SKELETON LOADING UI
  if (loading) {
    return (
      <section className="relative py-24 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <div className="h-10 w-80 mx-auto bg-slate-200 rounded-xl animate-pulse" />
          <div className="h-4 w-96 mx-auto mt-4 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-slate-200 rounded-2xl h-[360px] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 md:py-24 z-30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none" />

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
          ჩვენი ნამუშევრები
        </h2>
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          გაეცანით ჩვენს ბოლო projects. თითოეული შექმნილია თანამედროვე ტექნოლოგიებით.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Image */}
            <div className="h-46 md:h-44 overflow-hidden relative">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-slate-900">
                {project.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <div className="mt-5">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all"
                  >
                    ნახვა <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}