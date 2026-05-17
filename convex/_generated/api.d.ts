/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as blogAutomation from "../blogAutomation.js";
import type * as blogInternalQueries from "../blogInternalQueries.js";
import type * as comments from "../comments.js";
import type * as crons from "../crons.js";
import type * as http from "../http.js";
import type * as inquiriesDb from "../inquiriesDb.js";
import type * as posts from "../posts.js";
import type * as presence from "../presence.js";
import type * as profiles from "../profiles.js";
import type * as stats from "../stats.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  blogAutomation: typeof blogAutomation;
  blogInternalQueries: typeof blogInternalQueries;
  comments: typeof comments;
  crons: typeof crons;
  http: typeof http;
  inquiriesDb: typeof inquiriesDb;
  posts: typeof posts;
  presence: typeof presence;
  profiles: typeof profiles;
  stats: typeof stats;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("@convex-dev/better-auth/_generated/component.js").ComponentApi<"betterAuth">;
  presence: import("@convex-dev/presence/_generated/component.js").ComponentApi<"presence">;
};
