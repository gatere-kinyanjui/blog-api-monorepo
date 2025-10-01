import { TypographyDemo } from "@/components/typography-demo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TypographyDemo />
    </div>
  );
}
