const express = require("express");
const authRouter = require("./routes/authRouter");
const homeRouter = require("./routes/homeRouter");
const dashboardRouter = require("./routes/dashboardRouter");
// const { authRouter } = require("./routes/authRouter");
require("dotenv").config();

const blogApp = express();
const port = process.env.PORT;

// body parsers
blogApp.use(express.urlencoded({ extended: true }));
blogApp.use(express.json());

// routes middleware
blogApp.use("/", homeRouter);
blogApp.use("/auth", authRouter);
blogApp.use("/dashboard", dashboardRouter);

blogApp.listen(port, () => {
  console.log(`Blog API app listening on ${port}. Success!`);
});
