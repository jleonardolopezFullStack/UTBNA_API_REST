const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please type the category name Dude-From Schema"],
    uppercase: true,
  },
  state: { type: Boolean, default: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Category", categorySchema);
