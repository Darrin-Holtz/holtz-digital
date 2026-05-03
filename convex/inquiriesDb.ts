import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const save = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        projectType: v.string(),
        budget: v.string(),
        details: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("inquiries", {
            ...args,
            status: "new",
        });
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("inquiries").order("desc").take(50);
    },
});

export const markRead = internalMutation({
    args: { id: v.id("inquiries") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: "read" });
    },
});
