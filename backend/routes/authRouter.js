const express = require("express");
const { getLoginPage, postLogin } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/", getLoginPage);

authRouter.post("/", postLogin);

module.exports = authRouter;
