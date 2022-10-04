require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo is connected");
  } catch (error) {
    console.error(`Mongo error ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
