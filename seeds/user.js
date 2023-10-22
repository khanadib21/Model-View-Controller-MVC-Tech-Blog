const { User } = require("../tables");

const users = [
  {
    username: "user_1",
    email: "user_1@gmail.com",
    password: "Password123",
  },
  {
    username: "user_2",
    email: "user_2@gmail.com",
    password: "Password123",
  },
  {
    username: "user_3",
    email: "user_3@gmail.com",
    password: "Password123",
  },
  {
    username: "user_4",
    email: "user_4@gmail.com",
    password: "Password123",
  },
];

const userSeeds = () => User.bulkCreate(users);

module.exports = userSeeds;
