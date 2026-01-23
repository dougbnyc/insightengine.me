import { defineCollection, z } from "astro:content";

// Finite value lists
const LANG = ["en", "es", "pt-br"] as const;

const THEMES = [
  "systems",
  "handoffs",
  "risk",
  "institutions",
  "incentives",
  "accountability",
  "human-behavior",
  "agency",
  "tools-and-ai",
  "learning",
  "ethics",
  "communication",
] as const;

const TIER = ["foundational", "standard"] as const;

const STATUS = ["Draft", "Canonical", "Experimental"] as const;

const articles = defineCollection({
  type: "content",
  schema: z
    .object({
      // Required, reader facing
      title: z.string(),
      date: z.coerce.date(),

      // Stable site metadata
      slug: z.string().optional(),
      series: z.string().default("Insight Engine"),
      status: z.enum(STATUS).default("Draft"),

      // Keep as string so versions like 1.3 are safe
      version: z.string().default("1.0"),

      // Organization
      language: z.enum(LANG).default("en"),
      themes: z.array(z.enum(THEMES)).min(0).max(8).default([]),
      tier: z.enum(TIER).default("standard"),
      featuredOrder: z.number().optional(),

      // Optional helpers
      description: z.string().optional(),
    })
    .refine(
      (data) => data.tier !== "foundational" || typeof data.featuredOrder === "number",
      {
        message: "featuredOrder is required when tier is foundational",
        path: ["featuredOrder"],
      }
    )
    .refine(
      (data) => data.tier === "foundational" || typeof data.featuredOrder !== "number",
      {
        message: "featuredOrder should only be set when tier is foundational",
        path: ["featuredOrder"],
      }
    ),
});

export const collections = { articles };
