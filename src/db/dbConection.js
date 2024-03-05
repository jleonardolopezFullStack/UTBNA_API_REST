const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnection = async () => {
  const mongoUrl = process.env.MONGO_URL;
  try {
    const dbConnect = await mongoose.connect(mongoUrl);
    console.log(dbConnect.connection.db.databaseName);
  } catch (error) {
    console.log(`error: ${error}`);
    throw new Error(error);
  }
};
mongoConnection();

module.exports = { mongoConnection };
