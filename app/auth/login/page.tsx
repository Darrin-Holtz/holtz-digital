'use client';

import { loginSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormValues = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof loginSchema>) {
        console.log("Submitting login for:", data.email);

        const result = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Successfully signed in.");
                    router.push("/")
            },
                onError: (error) => {
                    toast.error(error.error.message);
                } 
            }
        });        
    }

    const isSubmitting = form.formState.isSubmitting;
    
    return(
        <Card>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>
                Sign in to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-y-4">
                    <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            aria-invalid={fieldState.invalid}
                            placeholder="john.doe@example.com"
                            {...field}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                    />
                    <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                            aria-invalid={fieldState.invalid}
                            placeholder="••••••••"
                            type="password"
                            {...field}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                        </Field>
                    )}
                    />

                    <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log In"}
                    </Button>
                </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}