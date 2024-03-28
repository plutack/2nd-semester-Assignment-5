// import neccessary modules
import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/connection.js";
import authRoute from "./routes/auth_route.js";

// load .env file
dotenv.config();

// declare variables
const app = express();
const port = process.env.PORT;

// middlewares
app.use(express.json());

// routes
app.use("/", authRoute);

// initialize connection to database and start express instance
connect().then(() => {
  console.log("database successfully connected");
  app.listen(port, () => console.log(`Server running on port: ${port}`));
});
