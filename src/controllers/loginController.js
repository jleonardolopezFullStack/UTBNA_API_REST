const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/authSchema");

const secret = process.env.SECRET_KEY;

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("Your email is not in database");
    }
    const comparePassword = bcryptjs.compareSync(password, user.password);
    if (!comparePassword) {
      return res.json({
        msg: "Something goes wrong with your password, try again please",
      });
    }

    const token = jwt.sign(
      {
        user,
      },
      secret,
      { expiresIn: "1h" }
    );

    token
      ? res.json({ msg: "The user have been logged", token })
      : res.json({
          msg: "Something goes wrong with your Login, please try again",
        });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { login };
