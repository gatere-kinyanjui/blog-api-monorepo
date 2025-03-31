const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  prismaClientInstance,
} = require("../orm-services/prismaClientInstance");

const dashboardRouter = express.Router();

dashboardRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    console.log("Requested ID from URL:", userId);
    console.log("Authenticated User ID from JWT:", req.user.id);

    const user = await prismaClientInstance.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        userName: true,
        posts: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("Fetched User from Database:", user);

    if (!user) {
      res.status(404).json({ message: "User not found. Please login." });
    } else {
      res.send(
        `Welcome, ${user.userName}. You have ${user.posts.length} posts drafted!`
      );
    }
  } catch (error) {
    res.status(500).json({
      message: "Error getting user dashboard: ",
      error: error.message,
    });
  }
});

module.exports = dashboardRouter;
