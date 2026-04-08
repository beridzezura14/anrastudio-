"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              ANRA Studio
            </h2>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              ვქმნით თანამედროვე, სწრაფ და კონვერტაციაზე ორიენტირებულ ვებსაიტებს თქვენი ბიზნესისთვის.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="font-semibold mb-4">ნავიგაცია</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-white transition">მთავარი</li>
              <li className="hover:text-white transition">სერვისები</li>
              <li className="hover:text-white transition">პორტფოლიო</li>
              <li className="hover:text-white transition">ფასები</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold mb-4">სერვისები</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>ვებ დეველოპმენტი</li>
              <li>UI/UX დიზაინი</li>
              <li>SEO ოპტიმიზაცია</li>
              <li>ბრენდინგი</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">კონტაქტი</h3>

            <div className="space-y-3 text-slate-400 text-sm">

              <div className="flex items-center gap-2">
                <Mail size={16} /> anrastudio@gmail.com
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} /> +995 558 29 43 64
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} /> თბილისი, საქართველო
              </div>

            </div>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ANRA Studio. ყველა უფლება დაცულია.
          </p>

          {/* CTA */}
          <Link
            href="/pages/contact"
            className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition"
          >
            დაგვიკავშირდი
            <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
          </Link>

        </div>
      </div>
    </footer>
  );
}