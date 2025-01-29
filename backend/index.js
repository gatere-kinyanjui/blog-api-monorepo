const express = require("express");
require("dotenv").config;

const blogApp = express();

const port = process.env.PORT || 3001;
blogApp.listen((req, res) => {
  console.log(`Blog API app listening on ${port}. Success!`);
});
