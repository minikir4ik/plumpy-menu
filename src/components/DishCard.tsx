"use client";

import { useState } from "react";
import type { Dish } from "@/lib/data/menu";
import { getDishImageUrl, getDietaryTags, getAllergens, getSuggestedPairings } from "@/lib/data/menu";

interface DishCardProps {
  dish: Dish;
  index?: number;
}

/* ── Nutrition pill ─────────────────────────────────────────────────────────── */
function NutritionPill({
  value,
  unit,
  label,
  staggerIndex,
}: {
  value: number;
  unit: string;
  label: string;
  staggerIndex: number;
}) {
  return (
    <div
      className="nutrition-pill-stagger flex-1 flex flex-col items-center gap-1"
      style={{
        background: "#F0F3D8",
        borderRadius: 10,
        padding: "8px 12px",
        animationDelay: `${staggerIndex * 50}ms`,
      }}
    >
      <span
        className="font-body text-[14px] font-bold leading-none"
        style={{ color: "#4A5A18" }}
      >
        {Number.isInteger(value) ? value : value.toFixed(1)}
        {unit && (
          <span className="text-[11px] font-normal" style={{ color: "#4A5A18" }}>
            {unit}
          </span>
        )}
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

/* ── Dish image ─────────────────────────────────────────────────────────────── */
function DishImage({ dish, index = 0 }: { dish: Dish; index?: number }) {
  const imageUrl = getDishImageUrl(dish.id);

  return (
    <div
      className="flex-shrink-0 overflow-hidden relative"
      style={{
        width: 96,
        height: 96,
        borderRadius: 14,
        background: "linear-gradient(135deg, #F0F3D8 0%, #E8EDD0 100%)",
      }}
      aria-hidden="true"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          width={96}
          height={96}
          loading={index >= 6 ? "lazy" : "eager"}
          decoding="async"
          style={{ width: 96, height: 96, objectFit: "cover", display: "block" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {/* Fork + knife placeholder icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{ opacity: 0.3 }}
            aria-hidden="true"
          >
            <path
              d="M10 4v8c0 2.2 1.8 4 4 4v12a1 1 0 0 0 2 0V16c2.2 0 4-1.8 4-4V4"
              stroke="#C5D14A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 4v6M18 4v6"
              stroke="#C5D14A"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M24 4c0 0-2 2-2 7s2 5 2 5v12a1 1 0 0 1-2 0V16"
              stroke="#C5D14A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Tag badge */}
      {dish.tags.length > 0 && (
        <span
          className="absolute flex-shrink-0 inline-flex items-center text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap"
          style={{
            top: 6,
            right: 6,
            background: "#C5D14A",
            color: "#4A5A18",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          {dish.tags[0] === "popular" ? "Popular" : "Top rated"}
        </span>
      )}
    </div>
  );
}

/* ── Main card ──────────────────────────────────────────────────────────────── */
export default function DishCard({ dish, index = 0 }: DishCardProps) {
  const [expanded, setExpanded] = useState(false);

  const dietaryTags = getDietaryTags(dish.description || "");
  const allergens = getAllergens(dish.description || "", dish.name);
  const pairings = getSuggestedPairings(dish);
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
        boxShadow: "0 2px 16px rgba(120, 90, 50, 0.08)",
        border: "1px solid #EDE8DF",
        padding: 18,
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
      <div className="flex items-start" style={{ gap: 16 }}>
        {/* Image */}
        <DishImage dish={dish} index={index} />

        {/* Info */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h3
            className="font-display text-[15px] font-semibold leading-snug"
            style={{ color: "#2A2218", letterSpacing: "-0.01em" }}
          >
            {dish.name}
          </h3>

          {dish.description && (
            <p
              className="font-body text-[13px] leading-snug mt-0.5"
              style={{
                color: "#7D7268",
                ...(!expanded
                  ? {
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
                  : {}),
              }}
            >
              {dish.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="font-body text-[17px] font-bold"
              style={{ color: "#2A2218" }}
            >
              {dish.price}
              <span
                className="text-[12px] font-normal ml-0.5"
                style={{ color: "#7D7268", opacity: 0.5, letterSpacing: "0.05em" }}
              >
                {" "}
                AED
              </span>
            </span>
            {weightStr && !expanded && (
              <span className="font-body text-[12px]" style={{ color: "#7D7268" }}>
                &middot; {weightStr}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="dish-expand"
          style={{ borderTop: "1px solid #F4F0E8", marginTop: 14, paddingTop: 14 }}
        >
          {/* Nutrition pills */}
          {hasNutrition && (
            <div className="flex gap-2 mb-3">
              {dish.calories !== undefined && (
                <NutritionPill value={dish.calories} unit="" label="kcal" staggerIndex={0} />
              )}
              {dish.protein !== undefined && (
                <NutritionPill value={dish.protein} unit="g" label="protein" staggerIndex={1} />
              )}
              {dish.fat !== undefined && (
                <NutritionPill value={dish.fat} unit="g" label="fat" staggerIndex={2} />
              )}
              {dish.carbs !== undefined && (
                <NutritionPill value={dish.carbs} unit="g" label="carbs" staggerIndex={3} />
              )}
            </div>
          )}

          {/* Weight */}
          {weightStr && (
            <p className="font-body text-[12px] mb-2" style={{ color: "#9C8B7E" }}>
              Weight:{" "}
              <span className="font-medium" style={{ color: "#9C8B7E" }}>
                {weightStr}
              </span>
            </p>
          )}

          {/* Dietary tags */}
          {dietaryTags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-2">
              {dietaryTags.map((tag) => (
                <span
                  key={tag.code}
                  className="font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: "#E8F5E0",
                    color: "#3A7D1A",
                    border: "1px solid #C5E8B8",
                  }}
                >
                  {tag.code}
                </span>
              ))}
            </div>
          )}

          {/* Pairing suggestions */}
          {pairings.length > 0 && (
            <div className="mb-2">
              <span
                className="font-body text-[11px] font-medium uppercase tracking-wider"
                style={{ color: "#7D7268", letterSpacing: "0.06em" }}
              >
                Pairs well with
              </span>
              <p className="font-body text-[13px] mt-0.5" style={{ color: "#4A5A18" }}>
                {pairings.map((p, i) => (
                  <span key={p.id}>
                    {i > 0 && ", "}
                    <em>{p.name}</em>
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* Allergens */}
          {allergens.length > 0 && (
            <div
              className="flex items-start gap-1.5 mb-2"
              style={{ color: "#9C8B7E" }}
            >
              {/* Warning icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="flex-shrink-0 mt-px"
                aria-hidden="true"
              >
                <path
                  d="M7 1L13 12H1L7 1Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 5.5V8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="10" r="0.5" fill="currentColor" />
              </svg>
              <span className="font-body text-[11px] leading-snug">
                May contain: {allergens.join(", ")}
              </span>
            </div>
          )}

          {/* Close button */}
          <button
            className="mt-2 w-full flex items-center justify-center gap-1 font-body text-[11px] py-1"
            style={{ color: "#7D7268" }}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
            aria-label="Collapse dish details"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8L6 4L10 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Close
          </button>
        </div>
      )}
    </article>
  );
}
