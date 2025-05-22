import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CreatePost from "./pages/create-post/createPost.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}

    <CreatePost />
  </StrictMode>
);
