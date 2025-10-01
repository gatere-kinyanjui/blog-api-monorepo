import CreatePost from "@/pages/create-post/createPost";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/write")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CreatePost />
    </div>
  );
}
