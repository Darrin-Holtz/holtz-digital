import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";
import { slugify } from "../lib/utils";

// Create a new post with the given title and body
export const createPost = mutation({
  args: { title: v.string(), body: v.string(), imageStorageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const slug = slugify(args.title);

    const blogArticle = await ctx.db.insert("posts", { 
        body: args.body,
        title: args.title,
        authorId: user._id,
        slug,
        imageStorageId: args.imageStorageId,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order('desc').collect();

    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl = 
          post.imageStorageId !== undefined ? await ctx.storage.getUrl(post.imageStorageId) : null;
    
        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  }
})

export const getPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (!post) return null;

    let imageUrl: string | null = null;

    if (post.imageStorageId) {
      imageUrl = await ctx.storage.getUrl(post.imageStorageId);
    }

    return {
      ...post,
      imageUrl,
    };
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostById = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) {
      return null;
    }

    const resolvedImageUrl =
      post?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(post.imageStorageId)
        : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface searchResultTypes {
  _id: string;
  title: string;
  body: string;
  slug?: string;
}

export const searchPosts = query({
  args: {
    term: v.string(),
    limit: v.number()
  },
  handler: async (ctx, args) => {
    const limit = args.limit;
    const results: Array<searchResultTypes> = [];
    const seen = new Set();
    const pushDocs = async (docs: Array<Doc<'posts'>>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue
        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
          slug: doc.slug,
        });
        if (results.length >= limit) break
      }
    }
    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.term))
      .take(limit);

    await pushDocs(titleMatches);

    if (results.length >= limit) {
      return results;
    }

    const remaining = limit - results.length;

    const bodyMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_body", (q) => q.search("body", args.term))
      .take(remaining);

    await pushDocs(bodyMatches);

    return results;
  },
});