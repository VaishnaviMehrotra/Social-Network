const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type:String,
    },
    bio: {
      type:String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    following:{
      type: Array,
      default:[],
    },
    followers:{
      type: Array,
      default:[],
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;