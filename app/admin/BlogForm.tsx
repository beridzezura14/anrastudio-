"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import dynamic from "next/dynamic";

type Blog = {
  id: string;
  title: string;
  content: string;
  author: string | null;
  image_url: string | null;
  created_at?: string;
};

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full bg-gray-50 animate-pulse border rounded-lg" />
  ),
});

import "react-quill-new/dist/quill.snow.css";

export default function BlogForm() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [oldImage, setOldImage] = useState<string>("");

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    fetchBlogs();
  }, []);

  // FETCH
  const fetchBlogs = async (): Promise<void> => {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    setBlogs((data as Blog[]) || []);
  };

  // UPLOAD IMAGE
  const uploadImage = async (
    file: File | null
  ): Promise<string | null> => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) {
      console.log("UPLOAD ERROR:", error);
      return null;
    }

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // CREATE
  const createBlog = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    setSuccessMsg("");

    let imageUrl = "";
    if (imageFile) {
      const uploaded = await uploadImage(imageFile);
      if (uploaded) imageUrl = uploaded;
    }

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        content,
        author,
        image_url: imageUrl,
      },
    ]);

    setLoading(false);

    if (error) {
      setSuccessMsg("❌ Error creating blog");
      return;
    }

    setSuccessMsg("✅ Blog created successfully!");

    resetForm();
    fetchBlogs();

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // UPDATE
  const updateBlog = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!editingBlog) return;

    setLoading(true);
    setSuccessMsg("");

    let imageUrl = oldImage;

    if (imageFile) {
      const uploaded = await uploadImage(imageFile);
      if (uploaded) imageUrl = uploaded;
    }

    const { error } = await supabase
      .from("blogs")
      .update({
        title,
        content,
        author,
        image_url: imageUrl,
      })
      .eq("id", editingBlog.id);

    setLoading(false);

    if (error) {
      setSuccessMsg("❌ Error updating blog");
      return;
    }

    setSuccessMsg("✅ Updated successfully!");

    resetForm();
    setEditingBlog(null);
    setOldImage("");
    fetchBlogs();

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // DELETE
  const deleteBlog = async (id: string): Promise<void> => {
    await supabase.from("blogs").delete().eq("id", id);
    fetchBlogs();
  };

  // EDIT
  const openEdit = (blog: Blog): void => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author || "");
    setOldImage(blog.image_url || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = (): void => {
    setTitle("");
    setContent("");
    setAuthor("");
    setImageFile(null);
    setOldImage("");
  };

  if (!isMounted) return null;

  return (
    <div className="bg-[#f9fafb] py-16 px-6">
      <h1 className="text-3xl font-bold text-center mb-12">ბლოგები</h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* FORM */}
        <div className="bg-white rounded-2xl p-8 shadow-sm lg:sticky top-22">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {editingBlog ? "ჩასწორება" : "შექმენი ბლოგი"}
          </h2>

          <form
            onSubmit={editingBlog ? updateBlog : createBlog}
            className="space-y-4"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border rounded-lg"
            />

            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className="w-full p-3 border rounded-lg"
            />

            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-80 mb-28 lg:mb-16"
            />

            {/* FILE */}
            <label className="block w-full cursor-pointer">
              <div className="w-full p-3 border rounded-lg bg-gray-50 text-center">
                აირჩიე ფოტო
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImageFile(e.target.files?.[0] || null)
                }
              />
            </label>

            {imageFile && (
              <p className="text-sm text-gray-500">
                {imageFile.name}
              </p>
            )}

            {editingBlog && oldImage && !imageFile && (
              <img
                src={oldImage}
                className="w-20 h-20 object-cover rounded"
              />
            )}

            {/* MSG */}
            {successMsg && (
              <div className="p-3 text-center text-sm rounded-lg bg-green-50 text-green-600">
                {successMsg}
              </div>
            )}

            <button className="w-full bg-black text-white py-3 rounded-lg">
              {loading
                ? "Loading..."
                : editingBlog
                ? "განახლება"
                : "შექმნა"}
            </button>

            {editingBlog && (
              <button
                type="button"
                onClick={() => {
                  setEditingBlog(null);
                  resetForm();
                }}
                className="w-full bg-gray-200 py-2 rounded-lg"
              >
                გაუქმება
              </button>
            )}
          </form>
        </div>

        {/* LIST */}
        <div className="grid sm:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col"
            >
              {blog.image_url && (
                <img
                  src={blog.image_url}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold">{blog.title}</h2>

                <p className="text-sm text-gray-500">
                  {blog.author || "Admin"}
                </p>

                <div
                  className="text-sm text-gray-600 line-clamp-2 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                />

                <div className="flex gap-2 mt-auto pt-4">
                  <button
                    onClick={() => openEdit(blog)}
                    className="flex-1 border text-blue-500 py-1 rounded"
                  >
                    ჩასწორება
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="flex-1 border text-red-500 py-1 rounded"
                  >
                    წაშლა
                  </button>
                </div>

                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-center mt-3 bg-black text-white py-2 rounded"
                >
                  ბლოგის ნახვა
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}