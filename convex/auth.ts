import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth.config";

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  const isDevMode = !!process.env.DEV_ORIGIN;

  return betterAuth({
    baseURL: "https://holtzdigital.com",

    trustedOrigins: [
      "https://holtzdigital.com",
      "https://holtz-digital.vercel.app",
      "*.app.github.dev",
      ...(process.env.DEV_ORIGIN ? [process.env.DEV_ORIGIN] : []),
    ],

    advanced: {
      disableCSRFCheck: isDevMode,
    },

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