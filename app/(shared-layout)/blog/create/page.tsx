'use client';

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormValues = {
  title: string;
  content: string;
};

export default function CreateRoute() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<FormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
        content: "",
        title: "",
        },
    });

    function onSubmit(values: z.infer<typeof postSchema>) {
        startTransition(async() => { 
            console.log("Hey this runs on the client side");
            await createBlogAction(values);
        })
    }
    return(
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Create Post
                </h1>
                <p className="text-lg text-muted-foreground pt-4">
                    Share your thoughts with the world
                </p>
            </div>
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Blog Article</CardTitle>
                    <CardDescription>Create a new blog article and share your thoughts with the world.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input
                                        aria-invalid={fieldState.invalid}
                                        placeholder="super exciting title"
                                        {...field}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="content"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                    <FieldLabel>Content</FieldLabel>
                                    <Textarea
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Your Bog Content Here"
                                        {...field}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                    </Field>
                                )}
                            />
                            <Button disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="animate-spin size-4" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <span>Create Post</span>
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>            
        </div>
    )
}