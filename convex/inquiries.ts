"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Resend } from "resend";

export const submit = action({
    args: {
        name: v.string(),
        email: v.string(),
        projectType: v.string(),
        budget: v.string(),
        details: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.runMutation(api.inquiriesDb.save, args);

        const apiKey = process.env.RESEND_API_KEY;
        if (apiKey) {
            const resend = new Resend(apiKey);
            await resend.emails.send({
                from: "Holtz Digital Inquiries <noreply@holtzdigital.com>",
                to: "darrinholtz@gmail.com",
                replyTo: args.email,
                subject: `New project inquiry from ${args.name}`,
                text: [
                    `Name: ${args.name}`,
                    `Email: ${args.email}`,
                    `Project Type: ${args.projectType}`,
                    `Budget: ${args.budget}`,
                    ``,
                    `Project Details:`,
                    args.details,
                ].join("\n"),
            });
        }
    },
});
