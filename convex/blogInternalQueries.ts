import { internalQuery } from "./_generated/server";

// Returns the 6 most recent published post titles + slugs for internal linking
export const getRecentPostSlugs = internalQuery({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").take(20);
    return posts
      .filter((p) => !p.status || p.status === "published")
      .slice(0, 6)
      .map((p) => ({ title: p.title, slug: p.slug }));
  },
});

// Returns all AI-generated posts (id + body) for the image URL migration
export const getAllAiPosts = internalQuery({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    return posts
      .filter((p) => p.isAiGenerated === true)
      .map((p) => ({ _id: p._id, body: p.body }));
  },
});

// Returns all existing post titles so the automation can skip already-used topics
export const getAllPostTitles = internalQuery({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    return posts.map((p) => p.title.toLowerCase().trim());
  },
});
