const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const usersSchema = require("./users.models").userSchema;
const bookingSchema = require("./bookings.models").bookingSchema;

const roomSchema = new Schema(
  {
    number: { type: Number, required: true, unique: true },
    type: { type: String, required: [true, "It Need to have room type"] },
    description: { type: String, required: true },
    bedCapacity: { type: Number, required: true },
    rent: { type: Number, required: true },
    address: { type: String, required: true, minlength: 5 },
    booking: [bookingSchema],
  },
  {
    timestamps: true,
  }
);
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
