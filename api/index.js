import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Userrouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import { listingRouter } from "./routes/listing.route.js";
import buyingRouter from "./routes/Buying.routes.js";
import rentalRouter from "./routes/rental.routes.js";
import contactRouter from "./routes/contact.route.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ✅ If you ever set auth cookies over HTTPS behind a proxy (Render),
   this is required so Secure/SameSite work correctly */
app.set("trust proxy", 1);

/* ✅ CORS: allow only FRONTEND origins, allow Authorization header + methods.
   Do NOT include your backend domain in origin. */
const ALLOWED_ORIGINS = [
  "https://nivaas360-frontend.vercel.app",
  "http://localhost:8081",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow curl/Postman/no-Origin
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      console.log("CORS blocked for origin:", origin);
      return cb(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

/* ✅ Body & cookies */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

/* ✅ DB connect BEFORE routes */
await connectDB();

/* ✅ Routes */
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/user", Userrouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/buying", buyingRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/contact", contactRouter);

/* 🔎 Debug helper — remove in prod */
app.get("/api/_debug", (req, res) =>
  res.json({ headers: req.headers, cookies: req.cookies })
);

/* ✅ Global error handler */
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Something went wrong";
  console.error(err.stack);
  res.status(statuscode).json({ success: false, status: statuscode, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
