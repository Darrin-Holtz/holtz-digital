import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { internal } from "./_generated/api";

export const getCommentsByPostId = query({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const data = await ctx.db
            .query("comments")
            .withIndex("by_postId", (q) => q.eq("postId", args.postId))
            .order("desc")
            .collect();

        return await Promise.all(
            data.map(async (comment) => {
                if (comment.authorImage) {
                    return comment;
                }

                const user = await authComponent.getAnyUserById(ctx, comment.authorId);

                return {
                    ...comment,
                    authorImage: user?.image ?? undefined,
                };
            })
        );
    }
})

export const createComment = mutation({
    args: {
        postId: v.id("posts"),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) {
            throw new ConvexError("Unauthorized");
        }
        const commentId = await ctx.db.insert("comments", {
            postId: args.postId,
            body: args.body,
            authorId: user._id,
            authorName: user.name ?? "Anonymous",
            authorImage: user.image ?? undefined,
        });

        await ctx.runMutation(internal.stats.bumpCounts, {
            commentsDelta: 1,
        });

        return commentId;
    }
});