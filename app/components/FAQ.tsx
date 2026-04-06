"use client";

import { useState } from "react";

const faqs = [
  {
    q: "რამდენ ხანში ამზადებთ ვებსაიტს?",
    a: "პროექტის სირთულიდან გამომდინარე, საშუალოდ 3-10 დღეში ვამზადებთ სრულ ვებსაიტს.",
  },
  {
    q: "ფასი რამდენია?",
    a: "ფასი დამოკიდებულია ფუნქციონალზე და დიზაინზე. გვაქვს სტარტერი, ბიზნეს და პრემიუმ პაკეტები.",
  },
  {
    q: "SEO ოპტიმიზაცია შედის?",
    a: "კი, ყველა საიტი მზადდება SEO-friendly სტრუქტურით, რაც გეხმარება Google-ში მაღალ პოზიციებზე მოხვედრაში.",
  },
  {
    q: "შეიძლება მოგვიანებით ცვლილებები?",
    a: "დიახ, ჩვენ გთავაზობთ მხარდაჭერას და განახლებებს პროექტის დასრულების შემდეგაც.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* glow */}
      <div className="absolute top-20 left-[-120px] w-[400px] h-[400px] bg-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
            ხშირად დასმული კითხვები
          </h2>
          <p className="mt-4 text-slate-500">
            პასუხები ყველაზე მნიშვნელოვან კითხვებზე
          </p>
        </div>

        {/* faq items */}
        <div className="space-y-4">

          {faqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
              >

                {/* question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="font-semibold text-slate-800">
                    {item.q}
                  </span>

                  <span className="text-xl text-slate-500">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* answer */}
                <div
                  className={`px-5 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                    {item.a}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}