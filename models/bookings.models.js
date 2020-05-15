const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateDates = (value) => {
  return value.checkoutDate <= value.checkinDate;
};
const bookingSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: "Room",
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    checkinDate: {
      type: Date,
      required: true,
    },
    checkoutDate: {
      type: Date,
      required: true,
      // validate: {
      //   validator: validateDates,
      //   message: "Checkout Date should be after checking date",
      // },
    },
  },
  {
    timestamps: true,
  }
);
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking, bookingSchema };
