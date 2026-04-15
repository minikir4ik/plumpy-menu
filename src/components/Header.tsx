"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE8DF] py-2.5"
          : "bg-transparent py-4",
      ].join(" ")}
      style={{ transition: "padding 200ms cubic-bezier(0.4,0,0.2,1), background 200ms cubic-bezier(0.4,0,0.2,1)" }}
    >
      <div className="max-w-[430px] mx-auto px-4 flex items-center justify-center">
        <div className="text-center">
          <div
            className="font-display text-[#2A2218] font-semibold leading-none transition-all duration-300"
            style={{
              fontSize: scrolled ? "22px" : "28px",
              letterSpacing: "-0.01em",
            }}
          >
            plumpy
          </div>
          <div
            className="font-body text-[#C5D14A] uppercase tracking-[0.3em] transition-all duration-300"
            style={{ fontSize: scrolled ? "8px" : "10px" }}
          >
            RESTAURANT
          </div>
        </div>
      </div>
    </header>
  );
}
