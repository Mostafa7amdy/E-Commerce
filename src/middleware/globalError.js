export const globalError = (err, req, res, next) => {
  let dev = "back";
  err.statusCode = err.statusCode || 500;
  if (dev == "back")
    res.status(err.statusCode).json({ error: err.message, stack: err.stack });
  else res.status(err.statusCode).json({ error: err.message });
};
