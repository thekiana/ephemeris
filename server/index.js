const express = require('express');
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Controller = require('./controllers.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  Controller.getStats.get(req, res);
});

app.post('/statsBefore', (req, res) => {
  Controller.postStatsBefore.post(req, res);
});

app.post('/statsAfter', (req, res) => {
  Controller.postStatsAfter.post(req, res);
});

app.listen(port, () => {
  console.log(`We be listening on port ${port}`);
});