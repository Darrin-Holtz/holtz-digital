import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

const DASHBOARD_KEY = "dashboard";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db
      .query("stats")
      .withIndex("by_key", (q) => q.eq("key", DASHBOARD_KEY))
      .unique();

    if (!stats) {
      let postsCount = 0;
      for await (const post of ctx.db.query("posts")) {
        if (post) {
          postsCount += 1;
        }
      }

      let usersCount = 0;
      for await (const profile of ctx.db.query("profiles")) {
        if (profile) {
          usersCount += 1;
        }
      }

      let commentsCount = 0;
      for await (const comment of ctx.db.query("comments")) {
        if (comment) {
          commentsCount += 1;
        }
      }

      return {
        postsCount,
        usersCount,
        commentsCount,
      };
    }

    return {
      postsCount: stats.postsCount,
      usersCount: stats.usersCount,
      commentsCount: stats.commentsCount,
    };
  },
});

export const bumpCounts = internalMutation({
  args: {
    postsDelta: v.optional(v.number()),
    usersDelta: v.optional(v.number()),
    commentsDelta: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("stats")
      .withIndex("by_key", (q) => q.eq("key", DASHBOARD_KEY))
      .unique();

    if (!existing) {
      let postsCount = 0;
      for await (const post of ctx.db.query("posts")) {
        if (post) {
          postsCount += 1;
        }
      }

      let usersCount = 0;
      for await (const profile of ctx.db.query("profiles")) {
        if (profile) {
          usersCount += 1;
        }
      }

      let commentsCount = 0;
      for await (const comment of ctx.db.query("comments")) {
        if (comment) {
          commentsCount += 1;
        }
      }

      await ctx.db.insert("stats", {
        key: DASHBOARD_KEY,
        postsCount,
        usersCount,
        commentsCount,
      });
      return null;
    }

    await ctx.db.patch(existing._id, {
      postsCount: Math.max(0, existing.postsCount + (args.postsDelta ?? 0)),
      usersCount: Math.max(0, existing.usersCount + (args.usersDelta ?? 0)),
      commentsCount: Math.max(0, existing.commentsCount + (args.commentsDelta ?? 0)),
    });

    return null;
  },
});

export const initializeCounts = internalMutation({
  args: {},
  handler: async (ctx) => {
    let postsCount = 0;
    for await (const post of ctx.db.query("posts")) {
      if (post) {
        postsCount += 1;
      }
    }

    let usersCount = 0;
    for await (const profile of ctx.db.query("profiles")) {
      if (profile) {
        usersCount += 1;
      }
    }

    let commentsCount = 0;
    for await (const comment of ctx.db.query("comments")) {
      if (comment) {
        commentsCount += 1;
      }
    }

    const existing = await ctx.db
      .query("stats")
      .withIndex("by_key", (q) => q.eq("key", DASHBOARD_KEY))
      .unique();

    if (!existing) {
      await ctx.db.insert("stats", {
        key: DASHBOARD_KEY,
        postsCount,
        usersCount,
        commentsCount,
      });
      return { postsCount, usersCount, commentsCount };
    }

    await ctx.db.patch(existing._id, {
      postsCount,
      usersCount,
      commentsCount,
    });

    return { postsCount, usersCount, commentsCount };
  },
});
