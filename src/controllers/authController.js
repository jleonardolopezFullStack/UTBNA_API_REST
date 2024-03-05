const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/authSchema");

const userGet = async (req = request, res = response) => {
  const newUsernew = req.user;
  try {
    const user = await User.find();

    res.json({ msg: `Get controllador de auth`, user });
  } catch (error) {
    res.status(400).json(error);
  }
};

const userGetOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ msg: "This ID doesnt exist, try again" });
    }

    res.json({ msg: `Get controllador de auth One`, user });
  } catch (error) {
    res.status(400).json(error);
  }
};

const userPost = async (req = request, res = response) => {
  const { name, email, password } = req.body;
  const salt = bcryptjs.genSaltSync(10);
  const newPassword = bcryptjs.hashSync(password, salt);

  try {
    const data = {
      name,
      email,
      password: newPassword,
    };

    const user = new User(data);
    const verifyUser = await User.findOne({ email });
    if (verifyUser) {
      return res.json({ msg: "User already exist, let try in login seccion" });
    }
    /*     verifyUser
      ?  res.json({ msg: `User already exist, let try in login seccion` })
      : await user.save(); */
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, email, newPassword } = req.body;
  // console.log(req.user);
  try {
    if (newPassword) {
      const salt = bcryptjs.genSaltSync(10);
      const newNewPassword = bcryptjs.hashSync(newPassword, salt);
      const userChangebyNewPassword = await User.findByIdAndUpdate(
        id,
        { password: newNewPassword },
        { new: true }
      );
      return res.json({
        msg: `Put controllador de auth con cambio password`,
        userChangebyNewPassword,
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    res.json({ msg: `Put controllador de auth`, user });
  } catch (error) {
    res.status(400).json(error);
  }
};

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndRemove(id, { new: true });

    res.json({ msg: `Delete controllador de auth`, user });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { userGet, userPost, userPut, userDelete, userGetOne };
