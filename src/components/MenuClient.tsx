"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CATEGORIES, MENU, getDishesForCategory } from "@/lib/data/menu";
import CategoryTabs from "./CategoryTabs";
import DishCard from "./DishCard";

const SEARCH_ICON = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="text-[#7D7268] flex-shrink-0"
  >
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SECTION_DOTS = (
  <div className="flex items-center gap-2 py-1 text-[#C5B9AC] text-xs select-none" aria-hidden="true">
    <span>·</span><span>·</span><span>·</span>
  </div>
);

export default function MenuClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const searchRef = useRef<HTMLInputElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer for active category tracking
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("section-", "");
          setActiveCategory(id);
        }
      },
      {
        rootMargin: "-110px 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(id, el);
      observerRef.current?.observe(el);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  // Filtered dishes
  const query = search.trim().toLowerCase();
  const isSearching = query.length > 0;

  const filteredBySearch = isSearching
    ? MENU.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          (d.description && d.description.toLowerCase().includes(query))
      )
    : null;

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Sticky search + tabs */}
      <div className="sticky z-30 bg-[#FAF7F2]" style={{ top: "52px" }}>
        {/* Search */}
        <div className="px-4 pt-3 pb-2.5 border-b border-[#EDE8DF]">
          <label htmlFor="menu-search" className="sr-only">Search dishes</label>
          <div
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-shadow duration-150"
            style={{
              background: "#F4F0E8",
              boxShadow: search ? "0 0 0 2px #C5D14A" : "none",
            }}
          >
            {SEARCH_ICON}
            <input
              ref={searchRef}
              id="menu-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent font-body text-[14px] text-[#2A2218] placeholder-[#B0A898] outline-none"
              aria-label="Search dishes"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); searchRef.current?.focus(); }}
                className="text-[#7D7268] hover:text-[#2A2218] transition-colors p-0.5 rounded"
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category tabs — hidden during search */}
        {!isSearching && (
          <CategoryTabs
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        )}
      </div>

      {/* Content */}
      <main className="flex-1 max-w-[430px] mx-auto w-full px-4 pb-8" id="menu-content">
        {isSearching ? (
          <SearchResults dishes={filteredBySearch!} query={query} />
        ) : (
          <FullMenu registerSection={registerSection} />
        )}
      </main>
    </div>
  );
}

function SearchResults({ dishes, query }: { dishes: ReturnType<typeof MENU.filter>; query: string }) {
  return (
    <section className="pt-5 animate-fade-in" aria-label="Search results">
      <p className="font-body text-[12px] text-[#7D7268] mb-4">
        {dishes.length === 0
          ? "No dishes found"
          : `${dishes.length} dish${dishes.length === 1 ? "" : "es"} found`}
      </p>
      {dishes.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-[18px] text-[#2A2218] mb-2">Nothing found</p>
          <p className="font-body text-[13px] text-[#7D7268]">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {dishes.map((dish, i) => (
            <div
              key={dish.id}
              className="animate-fade-slide-up"
              style={{ animationDelay: `${Math.min(i * 0.04, 0.3)}s` }}
            >
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function FullMenu({
  registerSection,
}: {
  registerSection: (id: string, el: HTMLElement | null) => void;
}) {
  return (
    <div className="pt-6 flex flex-col gap-10">
      {CATEGORIES.map((cat, catIdx) => {
        const dishes = getDishesForCategory(cat.id);
        if (dishes.length === 0) return null;

        return (
          <section
            key={cat.id}
            id={`section-${cat.id}`}
            ref={(el) => registerSection(cat.id, el)}
            aria-labelledby={`heading-${cat.id}`}
          >
            {/* Section divider (not for first) */}
            {catIdx > 0 && SECTION_DOTS}

            <h2
              id={`heading-${cat.id}`}
              className="font-display text-[20px] font-semibold text-[#2A2218] mb-4 mt-1"
              style={{ letterSpacing: "-0.015em" }}
            >
              {cat.name}
            </h2>

            <div className="flex flex-col gap-3 stagger-children">
              {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
