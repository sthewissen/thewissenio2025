// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection
const articlesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    excerpt: z.string().optional(),
    image: image(),
    tags: z.array(z.string())
  }),
});

const sidequestsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    image: image()
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    articles: articlesCollection,
    sidequests: sidequestsCollection
};