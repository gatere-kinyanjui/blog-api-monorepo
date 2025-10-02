import express from "express";

const getHomePage = (req, res) => {
  res.send("Welcome Home!");
  // res.json({ message: "HOME PAGE" });
};

export default getHomePage;
