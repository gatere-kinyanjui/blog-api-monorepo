import { ViewPost } from "@/components/view-post";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/article")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ViewPost />
    </div>
  );
}
