// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Determine if error is operational or programming
    const isOperationalError = err.isOperational || false;
    
    // Set appropriate status code
    const statusCode = err.statusCode || 500;
    
    // Send error response
    res.status(statusCode).json({
      status: 'error',
      message: isOperationalError ? err.message : 'Something went wrong!',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = { errorHandler };