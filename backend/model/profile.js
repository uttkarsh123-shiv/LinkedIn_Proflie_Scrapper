// models/profile.js
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    about: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    followerCount: DataTypes.INTEGER,
    connectionCount: DataTypes.INTEGER
  });
  return Profile;
};
