'use client';

import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  title: string;
  content: string;
};

export default function CreateRoute() {
    const form = useForm<FormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
        content: "",
        title: "",
        },
    });
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
                    <form>
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
                            <Button>Create Post</Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>            
        </div>
    )
}