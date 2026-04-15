"use client";

import { useState } from "react";
import type { Dish } from "@/lib/data/menu";
import { getAllergenTags } from "@/lib/data/menu";

interface DishCardProps {
  dish: Dish;
}

function NutritionPill({ value, unit, label }: { value: number; unit: string; label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-0.5 bg-[#F0F3D8] border border-[#DDE5A8] rounded-xl py-2 px-1.5">
      <span className="font-body text-[14px] font-semibold text-[#2A2218] leading-none">
        {Number.isInteger(value) ? value : value.toFixed(1)}
        <span className="text-[11px] font-normal text-[#7D7268]">{unit}</span>
      </span>
      <span className="font-body text-[9px] uppercase tracking-wider text-[#7D7268] leading-none">
        {label}
      </span>
    </div>
  );
}

function CategoryGradient({ category }: { category: string }) {
  const gradients: Record<string, string> = {
    "all-day-breakfast": "linear-gradient(135deg, #F0F3D8 0%, #E8EFC0 60%, #FFF8E6 100%)",
    starters: "linear-gradient(135deg, #F0EEF3 0%, #E5E0F0 60%, #F3F0E8 100%)",
    salads: "linear-gradient(135deg, #E8F3D8 0%, #D8ECC0 60%, #F0F3D8 100%)",
    soups: "linear-gradient(135deg, #F3EDD8 0%, #EDE0C0 60%, #F8F3E8 100%)",
    "main-course": "linear-gradient(135deg, #F3E8D8 0%, #EDD8C0 60%, #F8EEE8 100%)",
    "kids-menu": "linear-gradient(135deg, #F8F3D8 0%, #F0EAC0 60%, #FFF8E8 100%)",
    desserts: "linear-gradient(135deg, #F3D8E8 0%, #ECC0D8 60%, #F8E8EE 100%)",
    "sweet-toppings": "linear-gradient(135deg, #F3EDD8 0%, #EDE0BE 60%, #F8F3E0 100%)",
    "savoury-toppings": "linear-gradient(135deg, #E8F0D8 0%, #D8E8C0 60%, #F0F3D8 100%)",
    "side-dishes": "linear-gradient(135deg, #EEF3D8 0%, #E4ECC0 60%, #F3F3E8 100%)",
    lemonades: "linear-gradient(135deg, #F3F0D8 0%, #EDE8C0 60%, #FFFAE8 100%)",
    smoothies: "linear-gradient(135deg, #D8F0F3 0%, #C0E4EC 60%, #E8F8F3 100%)",
    "espresso-based": "linear-gradient(135deg, #E8D8C8 0%, #D8C4B0 60%, #F0E8D8 100%)",
    matcha: "linear-gradient(135deg, #D8F0D8 0%, #C8E8C0 60%, #EEF8E8 100%)",
    "tea-without-tea": "linear-gradient(135deg, #F3EDD8 0%, #E8E0C0 60%, #F8F0E0 100%)",
    "loose-leaf-tea": "linear-gradient(135deg, #E8F3E8 0%, #D8ECD8 60%, #F0F8F0 100%)",
    juices: "linear-gradient(135deg, #F8F0D8 0%, #F0E4C0 60%, #FFF8E8 100%)",
    "soft-drinks": "linear-gradient(135deg, #F3D8D8 0%, #ECC8C8 60%, #F8E8E8 100%)",
    water: "linear-gradient(135deg, #D8EEF3 0%, #C8E4EC 60%, #E8F4F8 100%)",
  };

  return (
    <div
      className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={{ background: gradients[category] || gradients["all-day-breakfast"] }}
      aria-hidden="true"
    >
      <div className="w-10 h-10 rounded-full opacity-20" style={{ background: "rgba(197,209,74,0.6)" }} />
    </div>
  );
}

export default function DishCard({ dish }: DishCardProps) {
  const [expanded, setExpanded] = useState(false);
  const allergens = getAllergenTags(dish.description || "");
  const hasNutrition = dish.calories !== undefined;
  const weightStr = dish.weight
    ? `${dish.weight}${dish.weightUnit ?? "g"}`
    : null;

  return (
    <article
      className="dish-card-press bg-white rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        boxShadow: "0 2px 12px rgba(120,90,50,0.07), 0 1px 3px rgba(120,90,50,0.05)",
        border: "1px solid #EDE8DF",
      }}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
    >
      {/* Collapsed row */}
      <div className="flex items-start gap-3 p-3">
        {/* Image */}
        <CategoryGradient category={dish.category} />

        {/* Info */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-display text-[15px] font-semibold text-[#2A2218] leading-snug"
              style={{ letterSpacing: "-0.01em" }}
            >
              {dish.name}
            </h3>
            {/* Tags */}
            {dish.tags.length > 0 && (
              <span className="flex-shrink-0 inline-flex items-center bg-[#C5D14A] text-[#4A5A18] text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap">
                {dish.tags[0] === "popular" ? "Popular" : "Top rated"}
              </span>
            )}
          </div>

          {dish.description && (
            <p
              className="font-body text-[13px] text-[#7D7268] leading-snug mt-0.5"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: expanded ? "unset" : 2,
                WebkitBoxOrient: "vertical",
                overflow: expanded ? "visible" : "hidden",
              }}
            >
              {dish.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-body text-[16px] font-bold text-[#2A2218]">
              {dish.price}
              <span className="text-[13px] font-normal text-[#7D7268] ml-0.5 opacity-60">AED</span>
            </span>
            {weightStr && !expanded && (
              <span className="font-body text-[12px] text-[#7D7268]">· {weightStr}</span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="dish-expand px-3 pb-3"
          style={{ borderTop: "1px solid #F4F0E8", paddingTop: "12px" }}
        >
          {/* Nutrition */}
          {hasNutrition && (
            <div className="flex gap-2 mb-3">
              {dish.calories !== undefined && (
                <NutritionPill value={dish.calories} unit="" label="kcal" />
              )}
              {dish.protein !== undefined && (
                <NutritionPill value={dish.protein} unit="g" label="protein" />
              )}
              {dish.fat !== undefined && (
                <NutritionPill value={dish.fat} unit="g" label="fat" />
              )}
              {dish.carbs !== undefined && (
                <NutritionPill value={dish.carbs} unit="g" label="carbs" />
              )}
            </div>
          )}

          {/* Weight */}
          {weightStr && (
            <p className="font-body text-[12px] text-[#7D7268] mb-2">
              Weight: <span className="font-medium text-[#2A2218]">{weightStr}</span>
            </p>
          )}

          {/* Allergens */}
          {allergens.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {allergens.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[10px] font-semibold uppercase tracking-wider bg-[#F0F3D8] text-[#4A5A18] border border-[#DDE5A8] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Collapse hint */}
          <button
            className="mt-2 w-full flex items-center justify-center gap-1 font-body text-[11px] text-[#7D7268] py-1"
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
            aria-label="Collapse dish details"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Close
          </button>
        </div>
      )}
    </article>
  );
}
