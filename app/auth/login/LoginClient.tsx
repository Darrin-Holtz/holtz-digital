"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";

import { loginSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use redirect only when explicitly provided in the URL.
  const redirectTarget = searchParams.get("redirect");

  // --- FORM ---
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // --- AUTH STATE ---
  const session = authClient.useSession();
  const user = session.data?.user;

  // --- PROFILE FROM CONVEX ---
  const profile = useQuery(
    api.profiles.getByUserId,
    user?.id ? { userId: user.id } : "skip"
  );

  // --- LOGIN SUBMIT ---
  async function onSubmit(data: z.infer<typeof loginSchema>) {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          form.reset();
          toast.success("Successfully signed in.");
          router.push(redirectTarget ?? "/dashboard");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      },
    });
  }

  // --- ROLE-BASED REDIRECT (fallback only) ---
  useEffect(() => {
    if (!user) return;
    if (profile === undefined) return;
    if (!profile) return;

    // If redirect exists, use it first.
    if (redirectTarget) {
      router.replace(redirectTarget);
      return;
    }

    // fallback logic
    if (profile.role === "admin") {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [user, profile, router, redirectTarget]);

  const isSubmitting = form.formState.isSubmitting;

  return (
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
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
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
  );
}