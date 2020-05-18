var express = require("express");
var router = express.Router();
var twilio = require("twilio");
var VoiceResponse = twilio.twiml.VoiceResponse;

require("dotenv").config();
var client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
router.route("/").post((req, res) => {
  var salesNumber = req.body.salesNumber;
  var url =
    "http://" +
    req.headers.host +
    "/call/outbound/" +
    encodeURIComponent(salesNumber);
  var options = {
    to: req.body.number,
    from: process.env.PHONE_NUMBER,
    url: url,
  };
  client.calls
    .create(options)
    .then((message) => {
      console.log(message.responseText);
      response.send({
        message: "Thank You .We will call you shortly",
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});
router.route("/outbound/:salesNumber").post(function (request, response) {
  var salesNumber = request.params.salesNumber;
  var twimlResponse = new VoiceResponse();

  twimlResponse.say(
    "Thanks for contacting our sales department. Our " +
      "next available representative will take your call. ",
    { voice: "alice" }
  );

  twimlResponse.dial(salesNumber);

  response.send(twimlResponse.toString());
});
module.exports = router;
