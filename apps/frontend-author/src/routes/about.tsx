// import { NavBar } from "@/components/navbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {/* <NavBar /> */}
      Hello, about!
    </div>
  );
}
