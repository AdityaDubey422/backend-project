import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
import connectDB from "./db/index.js";
import app from "./app.js";

// connectDB()
//   .then(() => {
//     app.on("error", (error) => {
//       console.log(`ERROR: ${error}`);
//     });

//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Server is running at http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(`MongoDB connection failed!! ${error}`);
//   });

// Connect to the database first, before starting the server
await connectDB(); // No need for .then().catch()

// Handle application errors
app.on("error", (error) => {
  console.error(`❌ ERROR: ${error.message}`);
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Server is running at http://localhost:${process.env.PORT}`);
});