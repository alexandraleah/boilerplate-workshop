const router = require('express').Router();
//routes go here

//404 for api requests that don't exist
router.use(function(req, res, next) {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

module.exports = router;
