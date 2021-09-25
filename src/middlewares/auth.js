const jwt = require("jsonwebtoken");
const response = require("../helpers/response");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.slice(7, authorization.length);
    try {
      req.user = jwt.verify(token, process.env.APP_KEY);
      if (req.user) {
        return await next();
      } else {
        return response(res, "Unauthorized", {}, 401, false);
      }
    } catch (err) {
      return response(res, err.message, {}, 500, false);
    }
  } else {
    return response(res, "Forbidden access", {}, 403, false);
  }
};
