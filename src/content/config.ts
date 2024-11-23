// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection
const articlesCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      image: z.object({
        url: z.string()
      }),
      tags: z.array(z.string())
    })
});

const sideQuestsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    image: z.object({
      url: z.string()
    })
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    articles: articlesCollection,
    sideQuests: sideQuestsCollection
};