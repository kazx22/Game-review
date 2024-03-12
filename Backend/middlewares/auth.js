const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  const secretKey = "mysecretkey";

  if (!token) {
    return res.status(401).json({ msg: "No Token Found" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
