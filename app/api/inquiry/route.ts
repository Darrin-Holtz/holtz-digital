import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/app/schemas/inquiry";

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const result = inquirySchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    const { name, email, projectType, budget, details } = result.data;

    try {
        await fetchMutation(api.inquiriesDb.save, { name, email, projectType, budget, details });
    } catch (err) {
        console.error("[inquiry] fetchMutation failed:", err);
        return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn("[inquiry] RESEND_API_KEY not set — skipping email");
    } else {
        const resend = new Resend(apiKey);
        const emailResult = await resend.emails.send({
            from: "Holtz Digital <onboarding@resend.dev>",
            to: "darrinholtz@gmail.com",
            replyTo: email,
            subject: `New project inquiry from ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Project Type: ${projectType}`,
                `Budget: ${budget}`,
                ``,
                `Project Details:`,
                details,
            ].join("\n"),
        });
        if (emailResult.error) {
            console.error("[inquiry] Resend error:", emailResult.error);
        }
    }

    return NextResponse.json({ success: true });
}
