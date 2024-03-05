const { Schema, model, SchemaType } = require("mongoose");

const packSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please type the category name Dude-From Schema"],
    uppercase: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  background: {
    type: String,
    required: [true, "Please upload an image Dude-From Schema"],
  },
  products: [String],
  state: { type: Boolean, default: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please put the price of the pack Schema"],
  },
  discount: {
    type: Number,
  },
  idStripe: {
    type: String,
    required: [true, "Please put the id from stripe app"],
  },
});

module.exports = model("Pack", packSchema);
