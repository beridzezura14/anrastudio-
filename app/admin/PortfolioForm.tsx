"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  img: string;
  tags: string[];
  link: string;
};

export default function PortfolioForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState(""); 
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // TAGS
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // ================= FETCH =================
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setProjects((data as Project[]) || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ================= UPLOAD =================
  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ================= TAGS =================
  const addTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) return;

    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string | undefined;

      if (file) {
        imageUrl = await uploadImage(file);
      }

      // ================= EDIT =================
      if (editingId) {
        const { error } = await supabase
          .from("portfolio")
          .update({
            title: title.trim(),
            description: description.trim(),
            tags: tags,
            link: link.trim(), // ⭐ ADDED
            ...(imageUrl ? { img: imageUrl } : {}),
          })
          .eq("id", editingId);

        if (error) {
          alert(error.message);
          return;
        }

        setEditingId(null);
      }

      // ================= ADD =================
      else {
        if (!file) {
          alert("Image required");
          return;
        }

        const finalImage = await uploadImage(file);

        const { error } = await supabase.from("portfolio").insert([
          {
            title: title.trim(),
            description: description.trim(),
            img: finalImage,
            tags: tags,
            link: link.trim(), // ⭐ ADDED
          },
        ]);

        if (error) {
          alert(error.message);
          return;
        }
      }

      // RESET
      setTitle("");
      setDescription("");
      setFile(null);
      setTags([]);
      setTagInput("");
      setLink(""); // ⭐ ADDED

      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteProject = async (id: string) => {
    await supabase.from("portfolio").delete().eq("id", id);
    fetchProjects();
  };

  // ================= EDIT START =================
  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setTags(project.tags || []);
    setLink(project.link || ""); // ⭐ ADDED
    setFile(null);
  };

  return (
    <div id="edit" className="space-y-16 bg-gradient-to-b from-gray-50 to-white min-h-screen py-10">
      {/* ================= FORM ================= */}
      <form
        
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-10 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl shadow-xl space-y-6"
      >
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">
            {editingId ? "Edit Project" : "Create New Project"}
          </h2>
          <p className="text-sm text-gray-500">
            Build your portfolio with modern design system
          </p>
        </div>

        {/* TITLE */}
        <input
          className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 transition"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          className="w-full px-5 py-4 border border-gray-200 rounded-2xl min-h-[130px] focus:outline-none focus:ring-2 focus:ring-black/10 transition"
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* LINK */}
        <input
          className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 transition"
          placeholder="https://your-live-project.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {/* IMAGE */}
        <div className="border border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50 hover:bg-gray-100 transition">
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* TAGS */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              className="flex-1 px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10 transition"
              placeholder="Add tag (HTML, CSS, React...)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />

            <button
              type="button"
              onClick={addTag}
              className="px-5 py-3 rounded-2xl bg-black text-white hover:scale-105 active:scale-95 transition"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full flex items-center gap-2 hover:bg-gray-200 transition"
              >
                #{tag}
                <button
                  onClick={() => removeTag(i)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-black text-white font-medium hover:opacity-90 active:scale-[0.98] transition shadow-lg"
        >
          {editingId
            ? "Update Project"
            : loading
              ? "Uploading..."
              : "Publish Project"}
        </button>
      </form>

      {/* ================= PROJECT LIST ================= */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition duration-500 hover:-translate-y-2"
          >
            {/* IMAGE */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>

              <p className="text-sm text-gray-500 line-clamp-2">
                {p.description}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {p.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* LINK */}
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-black font-medium hover:underline"
                >
                  View Project →
                </a>
              )}

              {/* ACTIONS */}
              <div className="flex justify-between pt-4 text-sm border-t border-gray-100">
                <a href="#edit">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </a>

                <button
                  onClick={() => deleteProject(p.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
