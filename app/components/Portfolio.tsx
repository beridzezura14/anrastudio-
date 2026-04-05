"use client";

import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-commerce Store",
    desc: "მაღალი performance ონლაინ მაღაზია React + Node.js-ით",
    tags: ["React", "Node.js", "UI/UX"],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Business Landing",
    desc: "კორპორატიული landing page თანამედროვე დიზაინით",
    tags: ["Next.js", "Tailwind"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Admin Dashboard",
    desc: "ინტელექტუალური admin panel მონაცემების მართვისთვის",
    tags: ["React", "Dashboard"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },

  // ➕ NEW 3 PROJECTS
  {
    title: "ფიტნეს აპლიკაცია",
    desc: "ვარჯიშისა და პროგრესის tracking სისტემა",
    tags: ["React", "Mobile UI"],
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "რესტორნის ვებსაიტი",
    desc: "ონლაინ მენიუ და დაჯავშნის სისტემა",
    tags: ["Next.js", "Booking"],
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "სტარტაპ ლენდინგი",
    desc: "მაღალი კონვერტაციის marketing page",
    tags: ["Landing", "UI/UX"],
    img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Portfolio() {
  return (
    <section className="relative py-24 bg-white z-10">

      {/* glow */}
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-indigo-300/20 blur-3xl rounded-full" />
      {/* <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-sky-300/20 blur-3xl rounded-full" /> */}

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">

        <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
          ჩვენი ნამუშევრები
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          რეალური პროექტები, რომლებიც აჩვენებს ჩვენს გამოცდილებას და ხარისხს
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl overflow-hidden border border-slate-100 bg-white/70 backdrop-blur hover:shadow-2xl hover:-translate-y-2 transition duration-500"
            >

              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              </div>

              <div className="p-5 text-left">

                <h3 className="text-lg font-semibold text-slate-800">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {project.desc}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-medium hover:gap-3 transition">
                  ნახვა
                  <ExternalLink size={16} />
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}