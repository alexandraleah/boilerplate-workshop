const router = require('express').Router();

//write the various routes here

//for routes that don't exist above
//404 not found
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
