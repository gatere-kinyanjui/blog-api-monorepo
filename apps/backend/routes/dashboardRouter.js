import express from "express";
import getDashboardPage from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/:id", getDashboardPage);

export default dashboardRouter;
