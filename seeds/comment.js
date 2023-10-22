const { Comment } = require("../tables");

const comments = [
  {
    comment_text: "New Comment",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "how are you?",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "i'm okay",
    user_id: 3,
    post_id: 2,
  },
  {
    comment_text: "what about you",
    user_id: 1,
    post_id: 2,
  },
];

const commetSeeds = () => Comment.bulkCreate(comments);

module.exports = commetSeeds;
