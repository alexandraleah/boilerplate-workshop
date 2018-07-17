const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './path/to/static/assets')));

app.use('/api', require('./api'));

//routes here

//if doesn't match any routes send index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html');
});


//and if all else fails
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
