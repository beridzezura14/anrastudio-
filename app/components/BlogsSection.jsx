"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function BlogsSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blog"
      className="py-24 bg-[#f9fafb] noto-sans-georgian"
      aria-labelledby="blog-heading "
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="text-sm text-gray-400">ბლოგი</span>

          <h2
            id="blog-heading"
            className="text-4xl md:text-5xl font-semibold text-gray-900 mt-4 caps"
          >
            იურიდიული <span className="text-[#ff6e3a]">ბლოგი</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl">
            წაიკითხეთ უახლესი სტატიები სამართალზე, იურიდიულ საკითხებზე და პრაქტიკულ რჩევებზე საქართველოში.
          </p>

          <div className="w-20 h-0.5 bg-[#ff6e3a] mt-6 rounded-full"></div>
        </div>

        <div className="relative">

          {/* ARROWS */}
          <div className="absolute -top-12 right-0 flex gap-3 z-10">
            <button className="custom-prev w-11 h-11 rounded-full bg-white/80 shadow-md flex items-center justify-center">
              ←
            </button>

            <button className="custom-next w-11 h-11 rounded-full bg-white/80 shadow-md flex items-center justify-center">
              →
            </button>
          </div>

          {/* SWIPER */}
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((blog, i) => (
              <SwiperSlide key={blog.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative mt-5"
                >

                  {/* IMAGE (SEO FIXED) */}
                  <div className="relative overflow-hidden rounded-2xl h-72 w-full">
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs">
                      {i + 1}
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="mt-6">

                    <div className="flex justify-between text-xs text-gray-400">
                      <time dateTime={blog.created_at}>
                        {new Date(blog.created_at).toLocaleDateString("en-US")}
                      </time>

                      <span>
                        ავტორი: <b>{blog.author || "Admin"}</b>
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold group-hover:text-[#ff6e3a] transition cups">
                      {blog.title}
                    </h3>

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-block mt-4 text-[#ff6e3a] text-sm font-medium"
                    >
                      სრულად ნახვა →
                    </Link>

                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}

export default BlogsSection;