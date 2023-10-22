const { Post } = require("../tables");

const posts = [
  {
    user_id: 1,
    content: "first content",
    title: "First Post",
  },
  {
    user_id: 2,
    content: "second content.",
    title: "Second Post",
  },
  {
    user_id: 3,
    content: "Third content.",
    title: "Third Post",
  }
];

const PostsSeed = () => Post.bulkCreate(posts);

module.exports = PostsSeed;
