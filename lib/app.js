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
const { mungeLocationResponse, mungeWeatherResponse, mungeYelpResponse } = require('./munge.js');


app.get('/location', async (req, res) => {
  const city = req.query.search;
  const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=pk.2f8fe88d778777832bda232a35e214eb&q=${city}&format=json`);

  const mungedData = mungeLocationResponse(data.body);

  res.json(mungedData);

});

app.get('/weather', async (req, res) => {
  const { latitude, longitude } = req.query;
  const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`);
  const mungedWeather = mungeWeatherResponse(response.body);
  res.json(mungedWeather);
});

app.get('/reviews', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const yelpData = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`)
      .set('Authorization', `Bearer ${process.env.YELP_KEY}`)
      .set('Accept', 'application/json');
    const mungedYelp = mungeYelpResponse(yelpData.body.businesses);
    res.json(mungedYelp);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
