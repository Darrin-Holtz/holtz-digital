import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
        slug: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
    }).index("by_slug", ["slug"])
        .searchIndex("search_title", {
            searchField: "title",
        })
        .searchIndex("search_body", {
            searchField: "body",
        }),
    comments: defineTable({
        postId: v.id("posts"),
        authorId: v.string(),
        authorName: v.string(),
        authorImage: v.optional(v.string()),
        body: v.string(),
    }).index("by_postId", ["postId"]),
    profiles: defineTable({
        userId: v.string(), // from better-auth
        role: v.string(),   // "admin" | "user"
    }).index("by_user", ["userId"]),
    stats: defineTable({
        key: v.string(),
        postsCount: v.number(),
        usersCount: v.number(),
        commentsCount: v.number(),
    }).index("by_key", ["key"]),
})