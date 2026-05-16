import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

    const smtpUser = process.env.ZOHO_SMTP_USER;
    const smtpPass = process.env.ZOHO_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
        console.warn("[inquiry] ZOHO_SMTP_USER or ZOHO_SMTP_PASS not set — skipping email");
    } else {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: { user: smtpUser, pass: smtpPass },
        });

        const mailResult = await transporter.sendMail({
            from: `"Holtz Digital" <${smtpUser}>`,
            to: "support@holtzdigital.com",
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
        }).catch((err: unknown) => {
            console.error("[inquiry] SMTP error:", err);
            return null;
        });

        if (!mailResult) {
            console.error("[inquiry] Email failed to send");
        }
    }

    return NextResponse.json({ success: true });
}
