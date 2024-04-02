// import neccessary modules
import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/connection.js";
import authRoute from "./routes/auth_route.js";
import postRoute from "./routes/post_route.js";

// load .env file
dotenv.config();

// declare variables
const app = express();
const port = process.env.PORT;
// const hostname = process.env.CYCLIC_URL

// middlewares
app.use(express.json());

// routes
app.use("/", authRoute);
app.use("/posts", postRoute);

// initialize connection to database and start express instance
connect().then(() => {
  console.log("database successfully connected");
  app.listen(port, () => console.log(`Server running on port: ${port}`));
});
