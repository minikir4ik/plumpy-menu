"use client";

import { useEffect, useRef } from "react";
import type { Category } from "@/lib/data/menu";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const tab = activeRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  const handleSelect = (id: string) => {
    onSelect(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      // Offset for sticky header (~110px)
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={containerRef}
      className="tabs-scroll sticky z-30 flex gap-2 overflow-x-auto px-4 py-2.5 bg-[#FAF7F2]"
      style={{ top: "var(--tabs-top, 56px)", borderBottom: "1px solid #EDE8DF" }}
      aria-label="Menu categories"
    >
      {categories.map((cat) => {
        const isActive = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            ref={isActive ? activeRef : null}
            onClick={() => handleSelect(cat.id)}
            className="flex-shrink-0 font-body font-medium whitespace-nowrap rounded-full text-[13px] transition-all duration-200 cursor-pointer"
            style={{
              padding: "8px 16px",
              background: isActive ? "#C5D14A" : "#F4F0E8",
              color: isActive ? "#4A5A18" : "#6B5D52",
              transform: isActive ? "scale(1.03)" : "scale(1)",
              boxShadow: isActive ? "0 1px 4px rgba(197,209,74,0.3)" : "none",
            }}
            aria-current={isActive ? "true" : undefined}
          >
            {cat.name}
          </button>
        );
      })}
    </nav>
  );
}
