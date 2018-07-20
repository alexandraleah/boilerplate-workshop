const express = require('express');
const app = express();

const path = require('path');
const db = require('./server/database');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', require('./server/login'));

app.use('/api', require('./server/api'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'internal server error.');
});

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
