var express = require("express");
var router = express.Router();
const Room = require("../models/room.models");
/* GET home page. */
router.route("/").get((req, res) => {
  Room.find()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post((req, res) => {
  number = req.body.number;
  type = req.body.type;
  description = req.body.description;
  bedCapacity = req.body.bedCapacity;
  rent = req.body.rent;
  address = req.body.address;

  const newRoom = new Room({
    number,
    type,
    description,
    bedCapacity,
    rent,
    address,
  });
  newRoom
    .save()
    .then(() => res.status(200).json("New Room added"))
    .catch((err) => res.status(400).json("Error " + err));
});
module.exports = router;