const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
    },
    phoneNumber: {
      type: Number,
      required: true,
      min: 10,
      //   validate: {
      //     validator: function (v) {
      //       return /d{10}/.test(v);
      //     },
      //     message: "{VALUE} is not a valid 10 digit number!",
      //   },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = { User, userSchema };
