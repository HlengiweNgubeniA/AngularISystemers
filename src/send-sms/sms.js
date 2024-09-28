// server.js (Node.js backend example)
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());


// Twilio credentials (get these from your Twilio dashboard)
const accountSid = 'YOUR_ACCOUNT_SID'; // Twilio Account SID
const authToken = 'YOUR_AUTH_TOKEN';   // Twilio Auth Token
const client = twilio(accountSid, authToken);

// API endpoint to send SMS
app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;
  
    client.messages
      .create({
        body: message,
        from: '+27720364564',  // Your Twilio number
        to: to,  // The phone number you are sending SMS to
      })
      .then((message) => {
        res.status(200).json({ success: true, sid: message.sid });
      })
      .catch((error) => {
        res.status(500).json({ success: false, error });
      });
  });

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
