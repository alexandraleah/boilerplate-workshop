const db = require('./database');
const app = require('./index');
const port = process.env.PORT || 3000;

db.sync().than(function() {
  app.listen(port);
});
