"use client";

import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "როგორ ეხმარება SEO შენი ბიზნესის ზრდას",
    desc: "გაიგე როგორ მუშაობს Google ranking და რატომ არის SEO აუცილებელი.",
    date: "2026 • იანვარი",
    category: "SEO",
  },
  {
    title: "Modern Web Design Trends 2026 Year",
    desc: "უახლესი დიზაინის ტრენდები, რომლებიც ზრდის მომხმარებლის ჩართულობას.",
    date: "2026 • იანვარი",
    category: "Design",
  },
  {
    title: "რატომ უნდა გქონდეს სწრაფი ვებსაიტი",
    desc: "სიჩქარე პირდაპირ გავლენას ახდენს გაყიდვებზე და მომხმარებელზე.",
    date: "2026 • იანვარი",
    category: "Performance",
  },
];

export default function Blog() {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">

      {/* glow */}
      <div className="absolute top-40 left-[-120px] w-[400px] h-[400px] bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
            ჩვენი ბლოგი
          </h2>
          <p className="mt-4 text-slate-500">
            რჩევები, სტატიები და თანამედროვე ვებ დეველოპმენტი
          </p>
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {posts.map((post, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm
              hover:shadow-xl hover:-translate-y-2 transition overflow-hidden"
            >

              {/* image placeholder */}
              <div className="h-40 bg-gradient-to-r from-indigo-100 to-sky-100" />

              <div className="p-6">

                {/* category + date */}
                <div className="flex justify-between text-xs text-slate-500 mb-3">
                  <span className="px-2 py-1 bg-slate-100 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>

                {/* title */}
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-500 transition">
                  {post.title}
                </h3>

                {/* desc */}
                <p className="mt-2 text-sm text-slate-500">
                  {post.desc}
                </p>

                {/* read more */}
                <button className="mt-4 flex items-center gap-2 text-indigo-500 font-medium text-sm group-hover:gap-3 transition">
                  წაიკითხე მეტი <ArrowRight size={16} />
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}