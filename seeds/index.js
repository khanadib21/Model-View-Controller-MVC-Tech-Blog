const sequelize = require("../config/connection");
const userSeeds = require("./user");
const PostsSeed = require("./post");
const commetSeeds = require("./comment");

const allSeedData = async () => {
  await sequelize.sync({ force: true });
  await userSeeds();
  await PostsSeed();
  await commetSeeds();
  process.exit(0);
};

allSeedData();
