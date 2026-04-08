"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. kill ALL animations + triggers
    ScrollTrigger.getAll().forEach((t) => t.kill(true));

    // 2. clear GSAP inline styles (IMPORTANT)
    gsap.globalTimeline.clear();

    // 3. reset scroll
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // 4. refresh after layout paint
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}