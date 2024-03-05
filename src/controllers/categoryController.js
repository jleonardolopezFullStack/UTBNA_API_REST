const { request, response } = require("express");
const Category = require("../models/categorySchema");
const User = require("../models/authSchema");

const categoryGet = async (req = request, res = response) => {
  try {
    const categorys = await Promise.all([
      Category.countDocuments(),
      Category.find().populate("user", "name"),
    ]);
    categorys
      ? res.json({ msg: "category Get", categorys })
      : res.json({
          msg: "something went wrong, try again to get categorys",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};
const categoryGetOne = async (req = request, res = response) => {
  const { name } = req.params;

  try {
    const category = await Category.findOne({ name }).populate("user", "name");
    category
      ? res.json({ msg: "category Get One", category })
      : res.json({
          msg: "something went wrong, try again to get category",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

const categoryPost = async (req = request, res = response) => {
  const { name } = req.body;
  const user = req.user;

  try {
    const data = {
      name,
      user: user.id,
    };
    const category = new Category(data);
    const newCategory = await category.save();
    newCategory
      ? res.json({ msg: "category Post", newCategory })
      : res.json({
          msg: "something went wrong, try again to create a new category",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

const categoryDelete = async (req = request, res = response) => {
  const { name } = req.params;
  console.log(name);
  try {
    const category = await Category.findOneAndRemove({ name });
    category
      ? res.json({ msg: "Category delete", category })
      : res.json({
          msg: "something went wrong, try again to delete category",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { categoryGet, categoryGetOne, categoryPost, categoryDelete };
