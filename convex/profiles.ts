import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { authComponent } from "./auth";

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
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) return null;

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .first();

    if (existing) return existing;

    const profileId = await ctx.db.insert("profiles", {
      userId: user._id,
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
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) return null;

    return ctx.db
      .query("profiles")
      .withIndex("by_user", (q) =>
        q.eq("userId", user._id)
      )
      .first();
  },
});