import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth.config";

// Convex Better Auth client
export const authComponent = createClient<DataModel>(components.betterAuth);

// Main auth factory
export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    // ✅ Hardcode for now (simplest + works)
    baseURL: "http://localhost:3000",

    // ✅ This fixes your 403 error
    trustedOrigins: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://secret-fish-571.convex.site",
    ],

    database: authComponent.adapter(ctx),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },

    plugins: [
      convex({ authConfig }),
    ],
  });
};

// Example query
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});