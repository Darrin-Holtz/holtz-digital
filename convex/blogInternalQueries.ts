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
