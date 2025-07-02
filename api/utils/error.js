export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
  const message = err.message || 'Something went wrong'; // Default message if not provided
  console.error(err.stack); // Log the error stack trace for debugging
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message
  });
}