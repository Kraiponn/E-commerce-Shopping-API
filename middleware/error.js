const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message;
  console.log(err);

  // MongoDB validator error
  if(err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 401);
  }

  // MongoDB duplicate keys
  if(err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // MongoDB 
  if(err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message
  });
};

module.exports = errorHandler;