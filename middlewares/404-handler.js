function NotFound(req, res, next) {
  res.status(404).json({
    statusCode: 404,
    message: "Sorry can't find that!",
    error: 'Not Found',
  });
}

module.exports = NotFound;
