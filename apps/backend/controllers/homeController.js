const express = require("express");

const getHomePage = (req, res) => {
  res.send("Welcome Home!");
};

module.exports = getHomePage;
