import express from "express"; // Import Express framework
import mongoose from "mongoose"; // For MongoDB connection
import dotenv from "dotenv"; // To load environment variables from .env file
import Userrouter from "./routes/user.route.js"; // Importing user routes
import authRouter from "./routes/auth.routes.js"; // Importing authentication routes
import { listingRouter } from "./routes/listing.route.js"; // Importing property listing routes
import cookieParser from "cookie-parser"; // To parse cookies from requests
import buyingRouter from "./routes/Buying.routes.js"; // Importing buying routes
import rentalRouter from "./routes/rental.routes.js";
import contactRouter from "./routes/contact.route.js";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO) // process.env.MONGO contains the DB connection string from .env
  .then(() => {
    console.log("Connected to MongoDB"); // Log success
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err); // Log error if connection fails
  });

const app = express(); // Create an Express application instance

// ✅ Middlewares
app.use(
  cors({
    origin: [
      "https://estate-view-realty-main.vercel.app",
      "https://nivaas360-bw37t4jn6-nency-shahs-projects-c244a2f5.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Increase JSON payload limit for base64 images (default is too small)
app.use(express.json({ limit: "10mb" })); // Allows large JSON requests (like images)
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Handles URL-encoded form data
app.use(cookieParser()); // Parses cookies from incoming requests

// ✅ Define API routes
app.use("/api/user", Userrouter); // User-related routes (e.g., profile, update user)
app.use("/api/auth", authRouter); // Authentication routes (e.g., login, register)
app.use("/api/listing", listingRouter); // Property listing routes (CRUD for properties)
app.use("/api/buying", buyingRouter); // Routes for buying transactions
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500; // Default to 500 if no custom status code
  const message = err.message || "Something went wrong"; // Default message
  console.error(err.stack); // Log error stack trace for debugging
  return res.status(statuscode).json({
    success: false,
    status: statuscode,
    message: message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
