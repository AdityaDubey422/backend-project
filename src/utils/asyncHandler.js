// higher order function to handle async errors in Express routes and avoid repetitive try-catch blocks
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // Ensures that any rejected promise is caught and passed to Express error handler
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export {asyncHandler};

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
