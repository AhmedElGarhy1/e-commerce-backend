const catchError = (err, req, res, next) => {
  res.json(err.message);
};

module.exports = catchError;
