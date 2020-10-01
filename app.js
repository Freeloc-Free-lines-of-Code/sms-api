const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use("/css", express.static(__dirname + "/style.css"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/send", function (req, res) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body:
        "Check us out on Instagram @freeloc_solutions, it's hard to miss!😉",
      from: "+12053089394",
      to: process.env.TO_PHONE_NUMBER,
    })
    .then((message) =>
      res.send(
        `<body style="height: 100vh; display: flex; align-items: center; justify-content: center; color:#fff, background-color: rgb(0, 126, 243); font-family: 'Nunito', Arial; margin:0"><h2>
          The message:${message.body.replace(
            "Sent from your Twilio trial account - ",
            " "
          )} was sent to the number: ${message.to}</h2></body>`
      )
    );
});

app.listen(3000);
