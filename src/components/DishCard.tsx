"use client";

import { useState } from "react";
import type { Dish } from "@/lib/data/menu";
import { getAllergenTags, getDishImageUrl } from "@/lib/data/menu";

interface DishCardProps {
  dish: Dish;
}

function NutritionPill({ value, unit, label }: { value: number; unit: string; label: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-1 rounded-[10px]"
      style={{ background: "#F0F3D8", padding: "8px 12px" }}
    >
      <span className="font-body text-[14px] font-bold leading-none" style={{ color: "#4A5A18" }}>
        {Number.isInteger(value) ? value : value.toFixed(1)}
        {unit && <span className="text-[11px] font-normal" style={{ color: "#4A5A18" }}>{unit}</span>}
      </span>
      <span
        className="font-body text-[10px] uppercase leading-none"
        style={{ color: "#7D7268", letterSpacing: "0.08em", fontWeight: 500 }}
      >
        {label}
      </span>
    </div>
  );
}

function DishImage({ dish }: { dish: Dish }) {
  const imageUrl = getDishImageUrl(dish.id);

  const gradients: Record<string, string> = {
    "all-day-breakfast": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    starters: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    salads: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    soups: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "main-course": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "kids-menu": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    desserts: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "sweet-toppings": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "savoury-toppings": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "side-dishes": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    lemonades: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    smoothies: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "espresso-based": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    matcha: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "tea-without-tea": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "loose-leaf-tea": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    juices: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    "soft-drinks": "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
    water: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
  };

  return (
    <div
      className="flex-shrink-0 overflow-hidden"
      style={{
        width: 80,
        height: 80,
        borderRadius: 12,
        background: gradients[dish.category] || gradients["all-day-breakfast"],
      }}
      aria-hidden="true"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
          style={{ width: 80, height: 80, objectFit: "cover", display: "block" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10 h-10 rounded-full opacity-20" style={{ background: "rgba(197,209,74,0.6)" }} />
        </div>
      )}
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
      className="dish-card-press overflow-hidden cursor-pointer select-none"
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(120, 90, 50, 0.08)",
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
        <DishImage dish={dish} />

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
              <span className="font-body text-[12px] text-[#7D7268]">&middot; {weightStr}</span>
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
            <p className="font-body text-[12px] mb-2" style={{ color: "#7D7268" }}>
              Weight: <span className="font-medium" style={{ color: "#7D7268" }}>{weightStr}</span>
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
