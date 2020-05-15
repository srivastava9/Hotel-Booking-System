var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("about", {
    title: "About",
    description: "This is pretty awesome",
    login: false,
    name: "Aditya Srivastava",
  });
});
module.exports = router;
