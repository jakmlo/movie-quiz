const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    unique: false,
    required: true,
  },
  author: {
    type: String,
    unique: false,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = mongoose.model("post", postSchema);
