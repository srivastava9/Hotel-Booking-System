const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
client.calls.create(
  {
    url: "http://demo.twilio.com/docs/voice.xml",
    to: process.env.PHONE_NUMBER,
    from: "(855) 964-4344",
  },
  {
    function(err, call) {
      if (err) {
        console.log(err);
      } else {
        console.log(call.sid, "Hey we made the call");
      }
    },
  }
);
