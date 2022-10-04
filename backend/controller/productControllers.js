const Product = require("../models/Product");
const User = require("../models/User");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const userData = await User.find(req.params.name);
    res.json(userData);
    console.log(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error " });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getUserData,
};
