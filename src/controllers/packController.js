const { request, response } = require("express");
const Category = require("../models/categorySchema");
const Pack = require("../models/packSchema");

const packGet = async (req = request, res = response) => {
  try {
    const pack = await Promise.all([
      Pack.countDocuments(),
      Pack.find().populate("user", "name").populate("category", "name"),
    ]);
    pack
      ? res.json({ msg: "pack get", pack })
      : res.json({
          msg: "something went wrong, try again to get all packs",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};
const packGetOne = async (req = request, res = response) => {
  const { name } = req.params;

  try {
    const pack = await Pack.findOne({ name })
      .populate("user", "name")
      .populate("category", "name");
    pack
      ? res.json({ msg: "Pack Get One", pack })
      : res.json({
          msg: "something went wrong, try again to get a pack",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

const packPost = async (req = request, res = response) => {
  const user = req.user;
  const { name, category, background, products, price, discount, idStripe } =
    req.body;

  try {
    const getCategory = await Category.findOne({ name: category });
    if (!getCategory) {
      return res.json({ msg: "The category doesnt exist, please try again" });
    }

    const data = {
      name,
      category: getCategory.id,
      background,
      products,
      user: user.id,
      price,
      discount,
      idStripe,
    };
    const pack = new Pack(data);
    const newPack = await pack.save();
    newPack
      ? res.json({ msg: "category Post", newPack })
      : res.json({
          msg: "something went wrong, try again to create a new pack",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

const packDelete = async (req = request, res = response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const pack = await Pack.findByIdAndRemove(id);
    pack
      ? res.json({ msg: "pack delete", pack })
      : res.json({
          msg: "something went wrong, try again to delete pack",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { packGet, packGetOne, packPost, packDelete };
