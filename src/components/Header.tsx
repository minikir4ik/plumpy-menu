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
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE8DF]"
          : "bg-transparent",
      ].join(" ")}
      style={{
        padding: scrolled ? "8px 0" : "14px 0",
        transition:
          "padding 200ms cubic-bezier(0.4,0,0.2,1), background 200ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="max-w-[430px] mx-auto px-4 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/plumpy-logo.png"
            alt="Plumpy Restaurant"
            className="block mx-auto transition-all duration-300"
            style={{
              width: "auto",
              height: scrolled ? 40 : 64,
              objectFit: "contain",
            }}
          />
          <div
            className="font-display italic text-[#7D7268] transition-all duration-300 overflow-hidden"
            style={{
              fontSize: "11px",
              opacity: scrolled ? 0 : 1,
              maxHeight: scrolled ? 0 : "24px",
              marginTop: scrolled ? 0 : "6px",
              transition:
                "opacity 200ms cubic-bezier(0.4,0,0.2,1), max-height 200ms cubic-bezier(0.4,0,0.2,1), margin-top 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Comfort food for everyday delivery
          </div>
        </div>
      </div>
    </header>
  );
}
