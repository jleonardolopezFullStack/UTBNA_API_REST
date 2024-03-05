const { request, response, next } = require("express");
var jwt = require("jsonwebtoken");
const User = require("../models/authSchema");

const tokenVerification = async (req = request, res = response, next) => {
  try {
    const secret = process.env.SECRET_KEY;
    const token = req.header("token");
    //const { token } = req.params;
    console.log(token);
    if (!token) {
      return res.json({ msg: "Token have to be fill now" });
    }
    const { user } = jwt.verify(token, secret);

    const verifyUserByToken = await User.findById(user._id);
    if (!verifyUserByToken) {
      return res.json({ msg: "wrong Token, please verify the information" });
    }

    req.user = verifyUserByToken;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Hey Dude, token have not been validated",
    });
  }
};

module.exports = { tokenVerification };
