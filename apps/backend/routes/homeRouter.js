import express from "express";

const getHomePage = require("../controllers/homeController");

const homeRouter = express.Router();

homeRouter.get("/", getHomePage);

export default homeRouter;
