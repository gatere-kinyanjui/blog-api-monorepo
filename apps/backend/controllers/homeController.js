const express = require("express");

const getHomePage = (req, res) => {
  res.send("Welcome Home!");
  // res.json({ message: "HOME PAGE" });
};

module.exports = getHomePage;
