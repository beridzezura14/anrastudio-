"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Feature = {
  id: string;
  text: string;
};

type Plan = {
  id: string;
  name: string;
  subtitle: string;
  original_price: number;
  discount_price: number | null;
  color: string;
  popular: boolean;
  created_at?: string;
  plan_features?: { id: string; feature: string }[];
};

type Discount = {
  percent: number;
  days: number;
};

export default function PricingForm() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [discountId, setDiscountId] = useState<string | null>(null);

  // form
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [color, setColor] = useState("from-sky-400 to-indigo-400");
  const [popular, setPopular] = useState(false);

  // GLOBAL DISCOUNT (NEW)
  const [discount, setDiscount] = useState<Discount>({
    percent: 0,
    days: 0,
  });

  const [features, setFeatures] = useState<Feature[]>([
    { id: crypto.randomUUID(), text: "" },
  ]);

  // ---------------- CALC ----------------
    const calculateDiscount = (price: number) => {
    if (!discount.percent || discount.percent <= 0) return null;
    return Number((price - (price * discount.percent) / 100).toFixed(2));
    };

  // ---------------- FETCH PLANS ----------------
  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from("plans")
      .select(`*, plan_features(id, feature)`)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("FETCH ERROR:", error);
      return;
    }

    setPlans(data || []);
  };

  const fetchDiscount = async () => {
    const { data, error } = await supabase
      .from("discount_settings")
      .select("*")
      .eq("active", true)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setDiscount({
        percent: data.percent,
        days: data.days,
      });

      setDiscountId(data.id);
    }
  };
const saveDiscount = async () => {
  // აქ ვანგარიშობთ მომავლის თარიღს: ახლანდელ დროს + მომხმარებლის მიერ შეყვანილი დღეები
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + discount.days);

  const payload = {
    percent: discount.percent,
    days: discount.days,
    expires_at: expiryDate.toISOString(), 
    active: true,
  };

  if (discountId) {
    const { error } = await supabase
      .from("discount_settings")
      .update(payload)
      .eq("id", discountId);
    if (error) console.log(error);
  } else {
    const { data, error } = await supabase
      .from("discount_settings")
      .insert(payload)
      .select()
      .single();
    if (error) console.log(error);
    if (data) setDiscountId(data.id);
  }

  fetchDiscount();
  alert("Global Discount Updated!");
};

  useEffect(() => {
    fetchPlans();
    fetchDiscount();
  }, []);

  // ---------------- RESET ----------------
  const resetForm = () => {
    setName("");
    setSubtitle("");
    setOriginalPrice("");
    setColor("from-sky-400 to-indigo-400");
    setPopular(false);
    setFeatures([{ id: crypto.randomUUID(), text: "" }]);
    setEditingId(null);
  };

  // ---------------- FEATURES ----------------
  const addFeature = () =>
    setFeatures((p) => [...p, { id: crypto.randomUUID(), text: "" }]);

  const removeFeature = (id: string) =>
    setFeatures((p) => p.filter((f) => f.id !== id));

  const updateFeature = (id: string, value: string) =>
    setFeatures((p) => p.map((f) => (f.id === id ? { ...f, text: value } : f)));

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const original = Number(originalPrice);
      const discount_price = calculateDiscount(original);

      const payload = {
        name,
        subtitle,
        original_price: original,
        discount_price,
        color,
        popular,
      };

      let planId = editingId;

      // CREATE
      if (!editingId) {
        const { data, error } = await supabase
          .from("plans")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        planId = data.id;
      }

      // UPDATE
      if (editingId) {
        const { error } = await supabase
          .from("plans")
          .update(payload)
          .eq("id", editingId);

        if (error) throw error;

        await supabase.from("plan_features").delete().eq("plan_id", editingId);
      }

      // FEATURES
      const featureRows = features
        .filter((f) => f.text.trim())
        .map((f) => ({
          plan_id: planId!,
          feature: f.text.trim(),
        }));

      if (featureRows.length > 0) {
        const { error } = await supabase
          .from("plan_features")
          .insert(featureRows);

        if (error) throw error;
      }

      await fetchPlans();
      resetForm();
    } catch (err) {
      console.log("SAVE ERROR:", err);
      alert("Error saving plan (check RLS / columns)");
    }

    setLoading(false);
  };

  // ---------------- EDIT ----------------
  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);

    setName(plan.name);
    setSubtitle(plan.subtitle);
    setOriginalPrice(String(plan.original_price));
    setColor(plan.color);
    setPopular(plan.popular);

    setFeatures(
      plan.plan_features?.map((f) => ({
        id: crypto.randomUUID(),
        text: f.feature,
      })) || [],
    );
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this plan?")) return;

    await supabase.from("plan_features").delete().eq("plan_id", id);
    await supabase.from("plans").delete().eq("id", id);

    fetchPlans();
  };

  // ---------------- UI ----------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 bg-gray-50 min-h-screen">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8 space-y-8"
      >
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {editingId ? "Edit Plan" : "Create New Plan"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage pricing plans and global discount system
          </p>
        </div>

        {/* DISCOUNT CARD */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Global Discount</h3>
            <span className="text-xs text-gray-500">Applies to all plans</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Percent (%)</label>
              <input
                type="number"
                className="w-full rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                value={discount.percent}
                onChange={(e) =>
                  setDiscount((p) => ({
                    ...p,
                    percent: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">Duration (days)</label>
              <input
                type="number"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                value={discount.days}
                onChange={(e) =>
                  setDiscount((p) => ({
                    ...p,
                    days: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          <button
            type="button"
            onClick={saveDiscount}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-medium hover:scale-[1.01] transition"
          >
            Save Global Discount
          </button>
        </div>

        {/* PLAN DETAILS */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600">Plan Details</h3>

          <input
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Plan name"
          />

          <input
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
          />

          <input
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Original price"
          />

          <input
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Gradient (from-blue-400 to-purple-500)"
          />
        </div>

        {/* OPTIONS */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
          <span className="text-sm text-gray-600">Mark as popular plan</span>

          <input
            type="checkbox"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
            className="w-5 h-5 accent-indigo-500"
          />
        </div>

        {/* DISCOUNT INFO */}
        <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded-xl">
          Active discount:{" "}
          <span className="font-semibold">{discount.percent}%</span> for{" "}
          <span className="font-semibold">{discount.days}</span> days
        </div>

        {/* FEATURES */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-600">Features</h3>

          {features.map((f) => (
            <div key={f.id} className="flex gap-2">
              <input
                className="flex-1 border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                value={f.text}
                onChange={(e) => updateFeature(f.id, e.target.value)}
                placeholder="Add feature..."
              />

              <button
                type="button"
                onClick={() => removeFeature(f.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl transition"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addFeature}
            className="w-full border border-dashed border-gray-300 py-2 rounded-xl text-gray-500 hover:bg-gray-50 transition"
          >
            + Add Feature
          </button>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3 pt-2">
          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
          >
            {loading ? "Saving..." : editingId ? "Update Plan" : "Create Plan"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full border py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="space-y-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>

            <p className="text-gray-500 mb-3">{plan.subtitle}</p>

            <div className="flex items-center gap-3">
              <span className="line-through text-gray-400">
                ${plan.original_price}
              </span>

              {plan.discount_price && (
                <span className="text-green-600 font-bold text-lg">
                  ${plan.discount_price}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              {plan.plan_features?.map((f) => (
                <div key={f.id}>• {f.feature}</div>
              ))}
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => handleEdit(plan)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(plan.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
