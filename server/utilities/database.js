const mongoose = require("mongoose");
const { mgUser, mgPassword, mgPort, mgDatabase } = require("../keys");
const connect = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      authSource: "admin",
    };

    const connection = await mongoose.connect(
      `mongodb://${mgUser}:${mgPassword}@mongo:${mgPort}/${mgDatabase}`,
      options
    );
    if (connection) console.log("Database Connected Successfully...");
  } catch (err) {
    console.log("Error while connecting database");
    console.log(err);
  }
};
module.exports = {
  connect,
};
