const Cart = require("../model/Cart");
const product = require("../model/product");
const cloudinary = require("../utils/cloudinary-setup");

async function getAllProducts(req, res) {
  try {
    const response = await product.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const singleProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await product.findOne({ _id: id });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  const { title, description, price, category } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SQIImage",
    });
    console.log(result, "result");

    const response = await product.create({
      title,
      description,
      price,
      category,
      image: result.secure_url,
    });
    if (!response) {
      return res.status(400).json({ message: "error creating product" });
    }
    res.status(201).json({ message: "product created succeess", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "there is an error", error });
  }
};

const createCart = async (req, res) => {
  try {
    const response = await Cart.create(req.body);
    if (!response) {
      return res.status(400).json({ message: "error creating cart" });
    }
    res.status(201).json({
      message: "cart created succeess",
      response,
    });
  } catch (error) {
    res.status(500).json({ message: "error creating cart" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const response = await Cart.find();
    res.status(200).json({
      result: response.length,
      carts: response,
    });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  singleProduct,
  createCart,
  getAllCart,
};
