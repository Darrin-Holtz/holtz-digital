import { handler } from "@/lib/auth-server";
import type { NextRequest } from "next/server";

const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL!;

// The Next.js handler proxies auth requests to the Convex HTTP endpoint.
// Better Auth on Convex validates that the Origin header matches its configured
// site URL. Since browser requests originate from the Replit dev/app domain,
// we rewrite Origin to the Convex site URL so the server-to-server call is trusted.
async function withConvexOrigin(
  request: NextRequest,
  fn: (req: NextRequest) => Promise<Response>
): Promise<Response> {
  const headers = new Headers(request.headers);
  headers.set("origin", convexSiteUrl);
  headers.delete("content-length");

  const patched = new Request(request.url, {
    method: request.method,
    headers,
    body: request.body,
    // @ts-expect-error duplex is required for streaming bodies in Node.js fetch
    duplex: "half",
  });

  return fn(patched as NextRequest);
}

export async function GET(request: NextRequest) {
  return withConvexOrigin(request, handler.GET);
}

export async function POST(request: NextRequest) {
  return withConvexOrigin(request, handler.POST);
}
