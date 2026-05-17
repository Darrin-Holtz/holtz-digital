"use node";

import { internalAction, ActionCtx } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import OpenAI from "openai";

// ─── Topic pool ─────────────────────────────────────────────────────────────
// Cycles deterministically so posts don't repeat for ~30+ weeks at 3/week
const TOPICS = [
  "Why Every Small Business Needs a Professional Website in 2026",
  "Mobile-First Design: The Strategy That Wins More Customers",
  "How Website Speed Directly Affects Your Revenue",
  "Local SEO: How to Dominate Search Results in Your City",
  "What Makes a Website Convert Visitors Into Paying Clients",
  "The Hidden Costs of a DIY Website (And What to Do Instead)",
  "How to Choose a Web Design Agency: A Business Owner's Guide",
  "Top Web Design Trends That Are Driving Results in 2026",
  "UX Design Fundamentals That Every Business Website Needs",
  "The Role of Color Psychology in Building a Brand Online",
  "How a Website Redesign Can Double Your Lead Generation",
  "Why SSL Certificates and Website Security Are Non-Negotiable",
  "Landing Page Optimization: Turning Traffic Into Customers",
  "Website Accessibility: Why It Matters and How to Get Started",
  "Content Marketing for Service Businesses: A Practical Guide",
  "How to Use Your Website to Generate Leads While You Sleep",
  "The Business Case for Investing in Professional Branding",
  "What Makes a Great Call-to-Action (And How to Write One)",
  "Copywriting for the Web: How to Write Pages That Sell",
  "How Internal Linking Boosts Your SEO and Keeps Visitors Longer",
  "Google Business Profile and Your Website: A Winning Combination",
  "Why Your Website Is Your Most Important Sales Tool",
  "How Page Structure Affects Both SEO and User Engagement",
  "The Anatomy of a High-Converting Service Page",
  "Why Consistent Branding Across Your Website Builds Trust",
  "How Testimonials and Social Proof Drive More Conversions",
  "The Importance of a Clear Value Proposition on Your Homepage",
  "How to Use FAQs to Rank for Long-Tail Keywords",
  "Schema Markup Explained: Helping Google Understand Your Website",
  "Why Your About Page Is More Important Than You Think",
  "How to Build a Contact Page That Actually Gets Responses",
  "Core Web Vitals: What They Are and Why Google Cares",
  "How Video Content on Your Website Increases Dwell Time",
  "The Power of a Blog: Why Consistent Content Drives Organic Traffic",
  "How to Write Meta Titles and Descriptions That Get Clicks",
  "Website Analytics: What to Track and How to Use the Data",
  "Why Your Business Needs a Custom Domain Email Address",
  "How Chatbots and Live Chat Improve Website Conversions",
  "The Difference Between UI and UX (And Why Both Matter)",
  "How to Perform a DIY Website Audit in Under an Hour",
];

// ─── Pexels helpers ─────────────────────────────────────────────────────────
interface PexelsPhoto {
  src: { large: string; large2x: string };
  photographer: string;
  photographer_url: string;
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}

async function fetchPexelsPhoto(
  keyword: string,
  apiKey: string,
): Promise<PexelsPhoto | null> {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=15&orientation=landscape`;
    const res = await fetch(url, {
      headers: { Authorization: apiKey },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PexelsResponse;
    if (!data.photos || data.photos.length === 0) return null;
    // Pick a random photo from results for variety
    const idx = Math.floor(Math.random() * data.photos.length);
    return data.photos[idx];
  } catch {
    return null;
  }
}

async function downloadAndUploadImage(
  ctx: ActionCtx,
  imageUrl: string,
): Promise<string | null> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") ?? "image/jpeg";

    const uploadUrl = await ctx.storage.generateUploadUrl();
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: buffer,
    });
    if (!uploadRes.ok) return null;
    const { storageId } = (await uploadRes.json()) as { storageId: string };
    return storageId;
  } catch {
    return null;
  }
}

// ─── Slug generation ─────────────────────────────────────────────────────────
function toSlug(title: string, suffix: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
  return `${base}-${suffix}`;
}

// ─── Main action ─────────────────────────────────────────────────────────────
export const generateAndPublishPost = internalAction({
  args: {
    topic: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const pexelsKey = process.env.PEXELS_API_KEY;

    if (!geminiKey) throw new Error("GEMINI_API_KEY is not set in Convex environment variables");
    if (!pexelsKey) throw new Error("PEXELS_API_KEY is not set in Convex environment variables");

    // Use Gemini 2.5 Pro via Google's OpenAI-compatible endpoint
    const openai = new OpenAI({
      apiKey: geminiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

    // Pick topic — use provided one or cycle deterministically by week
    const topic =
      args.topic ??
      (() => {
        const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
        return TOPICS[weekIndex % TOPICS.length];
      })();

    // Fetch recent published posts for internal linking
    const recentPosts = (await ctx.runQuery(internal.blogInternalQueries.getRecentPostSlugs, {})) as {
      title: string;
      slug: string;
    }[];

    const internalLinksContext =
      recentPosts.length > 0
        ? recentPosts
            .map((p) => `- "${p.title}" at /blog/${p.slug}`)
            .join("\n")
        : "No existing posts yet.";

    const sitePages = [
      '- "Web Design Services" at /web-design',
      '- "About Holtz Digital" at /about',
      '- "Our Blog" at /blog',
    ].join("\n");

    // Generate content with OpenAI
    const systemPrompt = `You are an expert content writer for Holtz Digital, a professional web design agency. 
Write engaging, SEO-optimized blog posts that position Holtz Digital as thought leaders in web design, digital marketing, and online business growth.
Tone: friendly, authoritative, and practical — speak directly to business owners.
Write from Holtz Digital's perspective ("we", "our team", "at Holtz Digital").

FORMATTING RULES (strictly follow these):
- Return a valid JSON object with exactly two keys: "title" and "body"
- "title": the exact post title as a plain string
- "body": full HTML content using ONLY these tags: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <figure>, <img>, <figcaption>, <a>
- Do NOT include <html>, <head>, <body>, <h1>, or any wrapper tags
- Do NOT use markdown — pure HTML only
- Place EXACTLY 3 image placeholders in the body using this exact format: <figure class="blog-image" data-keyword="KEYWORD_HERE"><figcaption>IMAGE_PLACEHOLDER</figcaption></figure>
  Replace KEYWORD_HERE with a 2-3 word search keyword relevant to that section (e.g. "mobile web design", "seo strategy", "website speed")
  Place them after H2 headings — one early, one in the middle, one near the end
- Include at least 3 internal links using <a href="URL">anchor text</a> — use the URLs provided in the context
- End with a strong call-to-action section linking to /web-design

CONTENT REQUIREMENTS:
- Exactly 5-7 H2 sections, each with 2-3 H3 sub-sections
- Minimum 3000 words total
- Include numbered lists or bullet points in at least 3 sections
- Include at least one <blockquote> with a compelling insight or statistic
- Every section must have substantive, specific, actionable content — no filler`;

    const userPrompt = `Write a comprehensive 3000+ word blog post with the title: "${topic}"

INTERNAL LINKS TO WEAVE INTO THE CONTENT NATURALLY:
${sitePages}
${internalLinksContext}

Return only the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 10000,
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content;
    if (!raw) throw new Error("OpenAI returned empty content");

    const parsed = JSON.parse(raw) as { title: string; body: string };
    const { title, body: rawBody } = parsed;

    // ── Fetch + upload hero image ────────────────────────────────────────────
    const heroKeyword = title.split(":")[0].trim();
    const heroPhoto = await fetchPexelsPhoto(heroKeyword, pexelsKey);

    let heroStorageId: string | undefined;
    if (heroPhoto) {
      const id = await downloadAndUploadImage(ctx, heroPhoto.src.large);
      if (id) heroStorageId = id;
    }

    // ── Replace body image placeholders with real images ─────────────────────
    const placeholderRegex =
      /<figure class="blog-image" data-keyword="([^"]+)"><figcaption>IMAGE_PLACEHOLDER<\/figcaption><\/figure>/g;

    let processedBody = rawBody;
    const matches = [...rawBody.matchAll(placeholderRegex)];

    for (const match of matches) {
      const [fullMatch, keyword] = match;
      const photo = await fetchPexelsPhoto(keyword, pexelsKey);

      let replacement: string;
      if (photo) {
        const storageId = await downloadAndUploadImage(ctx, photo.src.large);
        // Use ctx.storage.getUrl() to get the proper URL — avoids relying on
        // Next.js env vars which are not available inside Convex actions
        const imgSrc = storageId
          ? (await ctx.storage.getUrl(storageId as any)) ?? photo.src.large
          : photo.src.large;
        const alt = photo.alt || keyword;
        const credit = `Photo by <a href="${photo.photographer_url}" target="_blank" rel="noopener noreferrer">${photo.photographer}</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>`;

        replacement = `<figure class="blog-image"><img src="${imgSrc}" alt="${alt}" style="max-width:100%;height:auto;border-radius:8px;" /><figcaption style="font-size:0.8rem;color:#666;margin-top:4px;">${credit}</figcaption></figure>`;
      } else {
        replacement = "";
      }

      processedBody = processedBody.replace(fullMatch, replacement);
    }

    // ── Save to database ─────────────────────────────────────────────────────
    const slug = toSlug(title, Date.now().toString(36));

    const imageCredit = heroPhoto
      ? `Photo by <a href="${heroPhoto.photographer_url}" target="_blank" rel="noopener noreferrer">${heroPhoto.photographer}</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>`
      : undefined;

    await ctx.runMutation(internal.posts.saveAiPost, {
      title,
      body: processedBody,
      slug,
      imageStorageId: heroStorageId as any,
      imageCredit,
    });
  },
});

