export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "INternal server Error";

  return res.status(err.statusCode).send({
    success: false,
    message: err.message,
  });
};
