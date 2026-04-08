"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  content: string;
  author: string | null;
  image_url: string | null;
  created_at: string | null;
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);

      const { data: single } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      const { data: all } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (single) {
        const cleaned: Blog = {
          ...single,
          content: single.content
            ?.replace(/&nbsp;/g, " ")
            ?.replace(/\u00A0/g, " "),
        };

        setBlog(cleaned);
      }

      setBlogs((all as Blog[]) || []);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#f9fafb]">
        ჩატვირთვა...
      </div>
    );
  }

  const relatedBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  const richTextStyles = `
    .rich-content {
      width: 100%;
      line-height: 1.8;
      word-break: normal !important;
      overflow-wrap: anywhere !important;
      hyphens: none !important;
    }

    .rich-content p {
      margin-bottom: 1.2rem;
      color: #374151;
    }

    .rich-content h1,
    .rich-content h2,
    .rich-content h3 {
      font-weight: bold;
      color: #111827;
      margin-top: 1.8rem;
      margin-bottom: 1rem;
    }

    .rich-content ul {
      list-style-type: disc;
      margin-left: 1.5rem;
    }

    .rich-content ol {
      list-style-type: decimal;
      margin-left: 1.5rem;
    }

    .rich-content blockquote {
      border-left: 4px solid #f59e0b;
      padding-left: 1rem;
      font-style: italic;
      color: #4b5563;
    }

    .rich-content img {
      border-radius: 12px;
      max-width: 100%;
      height: auto;
      margin: 2rem 0;
    }
  `;

  return (
    <article className="bg-[#f9fafb] min-h-screen text-gray-900 pb-20">
      <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />

      {/* HERO */}
      <div className="relative h-[400px] md:h-[550px] w-full overflow-hidden">
        {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9fafb] to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-24 relative z-10">
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100">

          <h1 className="text-2xl md:text-5xl font-bold mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-8">
            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
              ავტორი: {blog.author || "Admin"}
            </span>

            {blog.created_at && (
              <span>
                {new Date(blog.created_at).toLocaleDateString("ka-GE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <div className="h-px bg-gray-100 mb-10" />

          {/* CONTENT */}
          <div
            className="rich-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* RELATED */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">სხვა ბლოგები</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedBlogs.map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.id}`}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    className="h-44 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <h3 className="font-bold line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-2">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}