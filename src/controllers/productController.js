const { request, response } = require("express");
const Product = require("../models/productSchema");

const productGet = async (req = request, res = response) => {
  try {
    const product = await Promise.all([
      Product.countDocuments(),
      Product.find().populate("user", "name"),
    ]);

    res.json({ msg: "product Get", product });
  } catch (error) {
    res.status(400).json(error);
  }
};

const productGetOne = async (req = request, res = response) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name }).populate("user", "name");

    res.json({ msg: "product Get One", product });
  } catch (error) {
    res.status(400).json(error);
  }
};

const productPost = async (req = request, res = response) => {
  const token = req.user;
  const { name } = req.body;

  try {
    const data = {
      name,
      image: `${name.toUpperCase()}.png`,
      user: token.id,
    };
    // console.log(data);

    const product = new Product(data);
    await product.save();
    console.log(product);
    res.json({ msg: "product Post", name, id: token.id });
  } catch (error) {
    res.status(400).json(error);
  }
};

const productDelete = async (req = request, res = response) => {
  const { name } = req.params;
  try {
    const product = await Product.findOneAndRemove({ name });
    res.json({ msg: "product Delete", product });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { productGet, productGetOne, productPost, productDelete };
