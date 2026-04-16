"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CATEGORIES, MENU, getDishesForCategory } from "@/lib/data/menu";
import CategoryTabs from "./CategoryTabs";
import DishCard from "./DishCard";

const SECTION_DIVIDER = (
  <div
    className="flex items-center justify-center gap-3"
    style={{ padding: "32px 0" }}
    aria-hidden="true"
  >
    <div className="flex-1 h-px" style={{ background: "#C5B9AC" }} />
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M10 2C10 2 8 6.5 5 8.5C2 10.5 3 14.5 6 15.5C8.5 16.3 10 13 10 13C10 13 11.5 16.3 14 15.5C17 14.5 18 10.5 15 8.5C12 6.5 10 2 10 2Z"
        fill="#C5B9AC"
        opacity="0.5"
      />
      <path
        d="M10 5C10 5 8.5 7.5 6.5 9.5C4.5 11.5 5.5 13.5 7.5 14C9 14.4 10 12 10 12C10 12 11 14.4 12.5 14C14.5 13.5 15.5 11.5 13.5 9.5C11.5 7.5 10 5 10 5Z"
        fill="#C5B9AC"
        opacity="0.3"
      />
    </svg>
    <div className="flex-1 h-px" style={{ background: "#C5B9AC" }} />
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

  const registerSection = useCallback(
    (id: string, el: HTMLElement | null) => {
      if (el) {
        sectionRefs.current.set(id, el);
        observerRef.current?.observe(el);
      } else {
        sectionRefs.current.delete(id);
      }
    },
    []
  );

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
      <div
        className="sticky z-30 bg-[#FAF7F2]"
        style={{
          top: "52px",
          boxShadow: "0 2px 8px rgba(120,90,50,0.06)",
        }}
      >
        {/* Search */}
        <div className="px-4 pt-3 pb-2.5 border-b border-[#EDE8DF]">
          <label htmlFor="menu-search" className="sr-only">
            Search dishes
          </label>
          <div
            className="flex items-center gap-2.5 transition-shadow duration-150"
            style={{
              background: "#F4F0E8",
              borderRadius: 14,
              padding: "12px 16px",
              boxShadow: search ? "0 0 0 2px #C5D14A" : "none",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="flex-shrink-0"
              style={{ color: "#7D7268" }}
            >
              <circle
                cx="7"
                cy="7"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M11 11L14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={searchRef}
              id="menu-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent font-body text-[14px] text-[#2A2218] placeholder-[#7D7268] outline-none"
              style={{ color: "#2A2218" }}
              aria-label="Search dishes"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  searchRef.current?.focus();
                }}
                className="hover:text-[#2A2218] transition-colors p-0.5 rounded"
                style={{ color: "#7D7268" }}
                aria-label="Clear search"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
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
      <main
        className="flex-1 max-w-[430px] mx-auto w-full px-4 pb-8"
        id="menu-content"
      >
        {isSearching ? (
          <SearchResults dishes={filteredBySearch!} query={query} />
        ) : (
          <FullMenu registerSection={registerSection} />
        )}
      </main>
    </div>
  );
}

function SearchResults({
  dishes,
  query,
}: {
  dishes: ReturnType<typeof MENU.filter>;
  query: string;
}) {
  return (
    <section className="pt-5 animate-fade-in" aria-label="Search results">
      <p className="font-body text-[12px] text-[#7D7268] mb-4">
        {dishes.length === 0
          ? "No dishes found"
          : `${dishes.length} dish${dishes.length === 1 ? "" : "es"} found`}
      </p>
      {dishes.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-[18px] text-[#2A2218] mb-2">
            Nothing found
          </p>
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
              <DishCard dish={dish} index={i} />
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
  let runningIndex = 0;

  return (
    <div className="pt-6 flex flex-col gap-10">
      {CATEGORIES.map((cat, catIdx) => {
        const dishes = getDishesForCategory(cat.id);
        if (dishes.length === 0) return null;

        const sectionStartIndex = runningIndex;
        runningIndex += dishes.length;

        return (
          <section
            key={cat.id}
            id={`section-${cat.id}`}
            ref={(el) => registerSection(cat.id, el)}
            aria-labelledby={`heading-${cat.id}`}
          >
            {/* Section divider (not for first) */}
            {catIdx > 0 && SECTION_DIVIDER}

            <h2
              id={`heading-${cat.id}`}
              className="font-display font-semibold text-[#2A2218] mb-6 mt-2"
              style={{ fontSize: "24px", letterSpacing: "-0.015em" }}
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0"
                  style={{ marginTop: -1 }}
                >
                  <path
                    d="M9 2C9 2 7 6 4 8C1 10 2 14 5 15C8 16 9 13 9 13C9 13 10 16 13 15C16 14 17 10 14 8C11 6 9 2 9 2Z"
                    fill="#C5D14A"
                    opacity="0.7"
                  />
                  <path
                    d="M9 4C9 4 8 7 6 9C4 11 5 13 7 13.5C8.5 14 9 12 9 12C9 12 9.5 14 11 13.5C13 13 14 11 12 9C10 7 9 4 9 4Z"
                    fill="#4A5A18"
                    opacity="0.3"
                  />
                </svg>
                {cat.name}
              </span>
            </h2>

            <div className="flex flex-col gap-3 stagger-children">
              {dishes.map((dish, i) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  index={sectionStartIndex + i}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
