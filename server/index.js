const express = require('express');
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('http://localhost:19002/', (req, res) => {
  console.log('req.body ', req.body);
  res.status(200).send(res);
});

app.listen(port, () => {
  console.log(`We be listening on port ${port}`);
});