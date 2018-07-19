const db = require('./server/database');
const app = require('./server');
const port = process.env.PORT || 3000;

db.sync().than(function() {
  app.listen(port);
});
