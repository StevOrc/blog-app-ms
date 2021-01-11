const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  console.log(`Event Bus, Event : ${req.body.type}`);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

const port = process.env.PORT || 4005;

app.listen(port, () => {
  console.log(`Event bus listeneing on port ${port}...`);
});
