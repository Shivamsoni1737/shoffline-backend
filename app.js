const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const app = express();
const port = process.env.PORT || 7000;
// const User = require('./models/userSchema');

const cors = require("cors");
//dotenv is a zero-dependency module that loads environment variables from a . env file into process.env
dotenv.config({ path: "./config.env" });

require("./db/connection");

// Allow specific websites to access your API
const allowedOrigins = ["http://localhost:19006", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

//linking our router files to make routing easy
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const user = require("./routes/user");
// const merchant = require("./routes/merchant");

app.use("/user", user);
// app.use("/api/merchant", merchant);

app.listen(port, () => {
  console.log(`port started at ${port}`);
});

app.get("/message", (_req, res) => {
  res.send("Hello World!");
});
