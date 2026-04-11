import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * GET PROFILE
 */
export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) =>
        q.eq("userId", args.userId)
      )
      .first();
  },
});

/**
 * CREATE PROFILE
 */
export const createProfile = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    role: v.string(),
  },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) =>
        q.eq("userId", identity.subject)
      )
      .first();

    if (existing) return existing;

    return await ctx.db.insert("profiles", {
      userId: identity.subject,
      role: "user", // ✅ ALWAYS default to user
    });
  },
});

export const getCurrentProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log("IDENTITY:", identity);

    if (!identity) return null;

    return ctx.db
      .query("profiles")
      .withIndex("by_user", (q) =>
        q.eq("userId", identity.subject)
      )
      .unique();
  },
});