import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        title: v.string(),
        body: v.string(),
        authorId: v.string(),
        slug: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
        status: v.optional(v.string()), // "published" | "draft" — undefined treated as published
        isAiGenerated: v.optional(v.boolean()),
    }).index("by_slug", ["slug"])
        .index("by_status", ["status"])
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
    inquiries: defineTable({
        name: v.string(),
        email: v.string(),
        projectType: v.string(),
        budget: v.string(),
        details: v.string(),
        status: v.string(), // "new" | "read" | "replied"
    }).index("by_status", ["status"]),
})