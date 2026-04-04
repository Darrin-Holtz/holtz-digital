"use client";

import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field,FieldError,FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Create an account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
            <FieldGroup className="gap-y-4">
                <Controller name="name" control={form.control} render={({ field, fieldState } ) => (
                    <Field>
                        <FieldLabel> Full Name</FieldLabel>
                        <Input placeholder="John Doe" {...field} />
                        {fieldState.invalid && (<FieldError errors ={[fieldState.error]} />)}
                    </Field>
                )}/>
                <Controller name="email" control={form.control} render={({ field, fieldState } ) => (
                    <Field>
                        <FieldLabel> Email</FieldLabel>
                        <Input placeholder="john.doe@example.com" {...field} />
                        {fieldState.invalid && (<FieldError errors ={[fieldState.error]} />)}
                    </Field>
                )}/>
                <Controller name="password" control={form.control} render={({ field, fieldState } ) => (
                    <Field>
                        <FieldLabel> Password</FieldLabel>
                        <Input placeholder="••••••••" type="password" {...field} />
                        {fieldState.invalid && (<FieldError errors ={[fieldState.error]} />)}
                    </Field>
                )}/>
                <Button>Sign Up</Button>
            </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}