const {sequelize} = require("./sequelize");

const sequelize = new sequelize({
    dialect:"sqlite",
    storage:"database.sqlite"
});
module.exports = sequelize;