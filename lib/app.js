const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging
const request = require('superagent');
const { mungeLocationResponse } = require('./munge.js');
app.get('/location', async (req, res) => {
  const city = req.query.search;
  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=pk.2f8fe88d778777832bda232a35e214eb&q=${city}&format=json`);

  const mungedData = mungeLocationResponse(data.body);

  res.json(mungedData);

});

app.use(require('./middleware/error'));

module.exports = app;
