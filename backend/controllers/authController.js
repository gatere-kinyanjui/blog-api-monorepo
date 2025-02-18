const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;

const opts = {};

const getLoginPage = (req, res) => {
  res.send("Login or Sign up here");
};

const postLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === "mimi@yule.com") {
    if (password === "nenosiri") {
      opts.expiresIn = 120;
      const secret = "SECRET_KEY";
      const token = jwt.sign({ email }, secret, opts);

      return res.status(200).json({ message: "imewai", token });
    }
  }

  return res.status(401).json({ message: "Auth Failed" });
};

module.exports = { getLoginPage, postLogin };
