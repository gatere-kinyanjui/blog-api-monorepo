const getBlogPostsPage = async (req, res, next) => {
  res.send("Blog posts appear here!");
  next();
};

const postBlogPostsPage = async (req, res) => {};

module.exports = { getBlogPostsPage };
