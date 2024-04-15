const express = require("express");
const {
  getAllProducts,
  createProduct,
  singleProduct,
  createCart,
  getAllCart,
} = require("../controller/product");

const Route = express.Router();

Route.get("/product", getAllProducts);
Route.get("/product/:id", singleProduct);
Route.post("/createProduct", createProduct);
Route.post("/create-cart", createCart);
Route.get("/carts", getAllCart);
module.exports = Route;
