import prismaClientInstance from "../orm-services/prismaClientInstance.js";

const getDashboardPage = async (req, res, next) => {
  try {
    const requestedUserId = parseInt(req.params.id);
    const authenticateduserId = req.user.id;
    console.log("[DASHBOARD ROUTER]: requested user id", requestedUserId);
    console.log(
      "[DASHBOARD ROUTER]: authenticated user id:",
      authenticateduserId
    );

    if (authenticateduserId !== requestedUserId) {
      console.log(
        "[DASHBOARD CONTROLLER ERROR]: requested id doesn't match authenticated id"
      );
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await prismaClientInstance.user.findUnique({
      where: {
        id: requestedUserId,
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
      return res.status(404).json({ message: "User not found. Please login." });
    }
    res.send(
      `Welcome, ${user.user_name}. You have ${user.posts.length} posts drafted!`
    );
  } catch (error) {
    res.status(500).json({
      message: "DASHBOARD ROUTER ERROR",
      error: error.message,
    });
  }
};

export default getDashboardPage;
