"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PortfolioForm from "./PortfolioForm";
import PricingForm from "./PricingForm";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-20 p-10 max-w-5xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="mb-6 text-sm text-red-500 border border-red-100 rounded-xl px-8 cursor-pointer"
        >
          Logout
        </button>
      </div>

      <PortfolioForm />
      <PricingForm /> 
    </div>
  );
}