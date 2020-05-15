var express = require("express");
var router = express.Router();
const User = require("../models/users.models").User;

/* GET users listing. */
router.get("/", function (req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const newUser = new User({
    username,
    phoneNumber,
  });
  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error" + err));
});
module.exports = router;
