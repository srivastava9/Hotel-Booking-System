const express = require("express");
const router = express.Router();

const Booking = require("../models/bookings.models").Booking;
const Room = require("../models/room.models");

router.route("/").get((req, res, next) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => {
      res.status(400).json("Error " + err);
    });
});

router.route("/add").post((req, res, next) => {
  roomId = req.body.roomId;
  bookedBy = req.body.bookedBy;
  checkinDate = req.body.checkinDate;
  checkoutDate = req.body.checkoutDate;

  const newBooking = new Booking({
    roomId,
    bookedBy,
    checkinDate,
    checkoutDate,
  });
  Room.findByIdAndUpdate(newBooking.roomId, {
    $push: { booking: newBooking },
  })
    .then((room) => {
      console.log(room);
    })
    .catch((err) => res.status(400).json("Error " + err));

  newBooking
    .save()
    .then(() => res.status(200).json("New Booking made"))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
