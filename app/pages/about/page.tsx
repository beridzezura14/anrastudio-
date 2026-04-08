"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Sparkles, Code2 } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-200/30 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">
            ჩვენს შესახებ
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
            ჩვენ ვართ თანამედროვე ვებ-სტუდია, რომელიც ქმნის სწრაფ, ლამაზ და
            შედეგზე ორიენტირებულ ვებსაიტებს.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-slate-900">
              რატომ ჩვენ?
            </h2>

            <p className="mt-4 text-slate-600">
              ჩვენ ვმუშაობთ თანამედროვე ტექნოლოგიებით — React, Next.js და Node.js. ასევე ვიყენებთ HTML, CSS და JavaScript-ს, რათა შევქმნათ ვებ-პროდუქტები, რომლებიც არა მხოლოდ ვიზუალურად დახვეწილია, არამედ სწრაფი, სტაბილური და ეფექტურიც.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Rocket className="text-indigo-500" />
                <span>სწრაფი და ოპტიმიზირებული ვებსაიტები</span>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles className="text-indigo-500" />
                <span>მოდერნ UI/UX დიზაინი</span>
              </div>

              <div className="flex items-center gap-3">
                <Code2 className="text-indigo-500" />
                <span>სუფთა და მასშტაბირებადი კოდი</span>
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-indigo-500" />
                <span>კლიენტზე ორიენტირებული მიდგომა</span>
              </div>
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-slate-900">
              ჩვენი მიზანი
            </h3>
            <p className="mt-4 text-slate-600">
              დავეხმაროთ ბიზნესებს ონლაინ წარმატებაში — მარტივი, სწრაფი და
              ძლიერი ციფრული პროდუქტებით.
            </p>

            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white">
              <p className="font-semibold">
                "ვქმნით არა უბრალოდ ვებსაიტებს, არამედ შედეგს"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
