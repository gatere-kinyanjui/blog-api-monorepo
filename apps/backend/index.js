import express, { urlencoded, json } from "express";
import path from "path";
import "dotenv/config";

import authRouter from "./routes/authRouter.js";
import homeRouter from "./routes/homeRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import blogPostsRouter from "./routes/blogPostsRouter.js";

// import initialize from "../backend/utils/passport/passport-auth.js";

import authMiddleware from "./middleware/authMiddleware.js";

const expressServerApp = express();
const port = process.env.PORT || 8000;

import cors from "cors";
import { fileURLToPath } from "url";

const corsOption = { origin: ["http://localhost:5173"] }; // author app vite local port

// body parsers
expressServerApp.use(urlencoded({ extended: true }));
expressServerApp.use(json());

// expressServerApp.use(express.initialize());

expressServerApp.use(cors(corsOption));

// expressServerApp.use(join(__dirname, "public").static);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
expressServerApp.use(express.static(path.join(__dirname, "public")));

// routes middleware
expressServerApp.use("/", homeRouter);
expressServerApp.use("/auth", authRouter);
expressServerApp.use("/dashboard", authMiddleware, dashboardRouter);
expressServerApp.use("/posts", blogPostsRouter);

// expressServerApp.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname))
// });

expressServerApp.listen(port, () => {
  console.log(`Blog API app listening on ${port}. Success!`);
});

/* // TODO: IMPLEMENT DASHBOARD/PROTECTED ROUTE
expressServerApp.get(
  "/dashboard",
  authMiddleware,
  dashboardRouter,
  (req, res) => {
    res.json({
      message: "Protected route accessed successfully!",
      user: req.user,
    });
  }
); */
