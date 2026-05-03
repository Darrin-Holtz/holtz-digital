import z from "zod";

export const inquirySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    projectType: z.string().min(1),
    budget: z.string().min(1),
    details: z.string().min(1),
});
