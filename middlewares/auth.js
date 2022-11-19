const jwt = require("jsonwebtoken");
const config = require("config");
const failerResponse = require("../responseBuilder/failerResponse");

module.exports = async (req, res, next) => {
  const token = await req.header("x-auth-token");
  if (!token) {
    return res.status(401).json(failerResponse("No token Provided !"));
  }
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  const isAdmin = decoded.isAdmin;
  if (!isAdmin) {
    return res.status(403).json(failerResponse("Forbidden !"));
  } else {
    next();
  }
};
