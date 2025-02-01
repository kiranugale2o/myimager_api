const mongoose = require("mongoose");

async function DatabaseConnection() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://ugalekiran29:o98nm12JL1i7TyoI@cluster0.pniravn.mongodb.net/myimager"
      )
      .then((res) => {
        console.log("database connection");
      })
      .catch((error) => {
        console.log("disconnected");
      });
  } catch (error) {
    return {
      status: 504,
      message: "SERVER IS WRONG !",
    };
  }
}

module.exports = { DatabaseConnection };

// import mongoose from "mongoose";

// export default async function DatabaseConnection() {
//   if (mongoose.connections[0].readyState) {
//     // Already connected
//     return;
//   }

//   try {
//     await mongoose.connect(
//       "mongodb+srv://ugalekiran29:o98nm12JL1i7TyoI@cluster0.pniravn.mongodb.net/myimager",
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }
// }
