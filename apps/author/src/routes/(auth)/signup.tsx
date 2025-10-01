/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}
