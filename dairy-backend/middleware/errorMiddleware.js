function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

function errorHandler(error, req, res, next) {
  const statusCode =
    error.name === 'ValidationError'
      ? 400
      : res.statusCode >= 400
        ? res.statusCode
        : 500

  res.status(statusCode).json({
    success: false,
    message:
      error.name === 'ValidationError'
        ? error.message
        : 'An unexpected server error occurred.',
  })
}

module.exports = { notFound, errorHandler }