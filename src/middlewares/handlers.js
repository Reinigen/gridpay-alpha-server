// Centralized Error Handling

export const errorHandler = async (err, req, res, next) => {
  console.log(err);

  const errorMessage = err.message || "Internal Server Error";
  const statusCode = 500 || err.status;

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage,
    errorCode: err.code || "SERVER_ERROR",
    details: err.details || null,
  });
};

export const responseHandler = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
