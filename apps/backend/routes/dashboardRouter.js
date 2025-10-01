import prismaClientInstance from "../orm-services/prismaClientInstance.js";

const dashboardRouter = expresss.Router();

dashboardRouter.get("/:id", async (req, res) => {
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
        user_name: true,
        posts: true,
        created_at: true,
        updated_at: true,
      },
    });

    console.log("Fetched User from Database: ", user);

    if (!user) {
      res.status(404).json({ message: "User not found. Please login." });
    } else {
      res.send(
        `Welcome, ${user.user_name}. You have ${user.posts.length} posts drafted!`
      );
    }
  } catch (error) {
    res.status(500).json({
      message: "DASHBOARD ROUTER ERROR",
      error: error.message,
    });
  }
});

export default dashboardRouter;
