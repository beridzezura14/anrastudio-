"use client";

import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("მესიჯი გაიგზავნა 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 to-white z-20">

      {/* background glow */}
      <div className="absolute top-10 left-[-120px] w-[450px] h-[450px] bg-indigo-300/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-120px] w-[400px] h-[400px] bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            დაგვიკავშირდით
          </h2>
          <p className="mt-4 text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            გაქვს იდეა? დავიწყოთ შენი პროექტი დღესვე
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* email */}
            <div className="group p-6 rounded-2xl bg-white/70 backdrop-blur border border-slate-100 shadow-sm hover:shadow-xl transition hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition">
                  <Mail className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Email</p>
                  <p className="text-slate-800 font-semibold">
                    anrastudio@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* phone */}
            <div className="group p-6 rounded-2xl bg-white/70 backdrop-blur border border-slate-100 shadow-sm hover:shadow-xl transition hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-sky-50 group-hover:bg-sky-100 transition">
                  <Phone className="text-sky-500" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Phone</p>
                  <p className="text-slate-800 font-semibold">
                    +995 558 29 43 64
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/995558294364"
              target="_blank"
              className="block text-center py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-emerald-500 to-green-500
              hover:from-emerald-600 hover:to-green-600
              shadow-md hover:shadow-xl transition-all"
            >
              WhatsApp-ზე მოგვწერე
            </a>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-white/70 backdrop-blur border border-slate-100 shadow-sm
            hover:shadow-xl transition space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="შენი სახელი"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200
              focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200
              focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            />

            <textarea
              name="message"
              placeholder="შენი მესიჯი..."
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200
              focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-indigo-500 to-sky-500
              hover:from-indigo-600 hover:to-sky-600
              shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              გაგზავნა <Send size={18} />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}