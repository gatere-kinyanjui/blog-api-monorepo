import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-4 justify-between w-full">
      {/* <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "} */}
      {/* <Link to="/about" className="[&.active]:font-bold">
        About
      </Link> */}
      <Link to="/write" className="[&.active]:font-bold">
        Write
      </Link>
      {/* <Link to="/article" className="[&.active]:font-bold">
        Article
      </Link> */}
      {/* <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link> */}
      {/* <Link to="/signup" className="[&.active]:font-bold">
        Sign up
      </Link> */}
    </div>
    {/* <hr /> */}
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
