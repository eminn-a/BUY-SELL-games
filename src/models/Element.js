const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//change if you want (depends on exam)
const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
