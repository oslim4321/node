require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const productRoute = require("./src/router/product");
const userRpute = require("./src/router/user");
const blogRoute = require("./src/router/blog");
const mongoose = require("mongoose");
const cors = require("cors");
const ImageUploadRoute = require("./src/router/imageUpload");

const app = express();
app.use(cors());

const mongoApiConnect = process.env.mongoURL;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", productRoute);
app.use(userRpute);
app.use("/api/v1", blogRoute);
app.use("/api/v1", ImageUploadRoute);

let port = 4000;

// MVC  --> MODEL VIEW CONTROLLER

const start = async () => {
  try {
    const conn = await mongoose.connect(mongoApiConnect);
    console.log("connected to db");
    if (conn) {
      app.listen(port, () => {
        console.log("server listening on port" + port);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

start();
