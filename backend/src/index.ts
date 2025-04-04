import "dotenv/config"; // this will allow to read my server the .env file
import express from "express";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchError from "./utils/catchError";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoute from "./routes/session.route";
import eventRoutes from "./routes/event.route";
const app = express();

app.use(express.json()); // a middleware to parse a json request
app.use(express.urlencoded({ extended: true })); // URL encoded to parse a Form Data
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (_, res) => {
  res.status(OK).json({ status: "healthy" });
});

app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoute);
app.use(errorHandler);

//events
app.use("/events", eventRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV}`);
  await connectToDatabase();
});
