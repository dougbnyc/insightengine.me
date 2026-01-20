import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    series: z.string().optional(),
    status: z.enum(["Draft", "Canonical", "Experimental"]).optional(),
    version: z.coerce.number().optional(),
  }),
});

export const collections = { articles };
