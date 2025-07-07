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
    console.log("Get posts full error:", error);

    res.status(500).json({
      message: "Get blogposts controller error: ",
      error: error.message,
      details: error.meta,
    });
  }
};

const postBlogPostPage = async (req, res) => {
  try {
    const { title, content, published, author_id } = req.body;
    const postToAdd = await prismaClientInstance.post.create({
      data: {
        title: title,
        content: content,
        published: published || false,
        author_id: author_id,
      },
    });

    return res
      .status(201)
      .json({ message: "Post added successfully: ", data: postToAdd });
  } catch (error) {
    console.log("Post blog full error: ", error);

    res.status(500).json({
      message: "Post blogpost controller error",
      error: error.message,
    });
  }
};

module.exports = { postBlogPostPage, getBlogPostsPage };
