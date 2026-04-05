import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new post with the given title and body
export const createPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const blogArticle = await ctx.db.insert("posts", { 
        body: args.body,
        title: args.title,
        authorId: user._id,
    });
    return blogArticle;
  },
});