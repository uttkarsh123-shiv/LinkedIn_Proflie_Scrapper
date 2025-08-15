const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Profile = require("./profile")(sequelize, Sequelize.DataTypes);

// Sync database
sequelize.sync()
  .then(() => console.log("Database & tables created!"))
  .catch(err => console.error(err));

module.exports = { Profile };
