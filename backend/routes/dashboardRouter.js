const express = require("express");

const dashboardRouter = express.Router();

dashboardRouter.get("/", (req, res) => {
  res.send("This is your dashboard");
});

module.exports = dashboardRouter;
