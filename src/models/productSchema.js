const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please type the product name Dude-From Schema"],
    uppercase: true,
  },
  image: {
    type: String,
    required: [true, "Please upload an image Dude-From Schema"],
  },
  state: { type: Boolean, default: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Product", productSchema);
