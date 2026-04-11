import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

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

    const profileId = await ctx.db.insert("profiles", {
      userId: identity.subject,
      role: "user", // ✅ ALWAYS default to user
    });

    await ctx.runMutation(internal.stats.bumpCounts, {
      usersDelta: 1,
    });

    return profileId;
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