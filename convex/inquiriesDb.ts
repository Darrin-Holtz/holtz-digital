import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { ConvexError } from "convex/values";

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

export const markRead = mutation({
    args: { id: v.id("inquiries") },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) throw new ConvexError("Unauthorized");
        await ctx.db.patch(args.id, { status: "read" });
    },
});
