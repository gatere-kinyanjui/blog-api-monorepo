const {
  prismaClientInstance,
} = require("../orm-services/prismaClientInstance");

const getBlogPostsPage = async (req, res, next) => {
  // TODO: ENSURE THIS MIDDLEWARE WORKS BY FETCHING BLOG POSTS
  try {
    const posts = await prismaClientInstance.post.findMany({
      // include: {
      //   id: true,
      // },
    });
    res.send(posts);

    console.log(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Get blog posts controller error: ", error });
  }
  // res.send("Blog posts appear here!");

  next();
};

// const postBlogPostsPage = async (req, res) => {};

module.exports = { getBlogPostsPage };
