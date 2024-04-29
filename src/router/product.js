const express = require("express");
const {
  getAllProducts,
  createProduct,
  singleProduct,
  createCart,
  getAllCart,deleteProduct,updateProduct
} = require("../controller/product");
const multerUploads = require("../utils/multerUpload");

const Route = express.Router();

Route.get("/product", getAllProducts);
Route.get("/product/:id", singleProduct);
Route.post("/createProduct", multerUploads.single("image"), createProduct);
Route.post("/create-cart", createCart);
Route.get("/carts", getAllCart);
Route.delete('/product/delete/:id', deleteProduct)
Route.patch('/product/update-product/:id', updateProduct)
module.exports = Route;
