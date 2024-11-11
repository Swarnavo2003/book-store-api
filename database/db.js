const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://swarnavo2020:bEoPgGiWEIiqNwzH@cluster0.1y82d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.error("Mongodb connection failed :", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
