module.exports = function (req, res, next) {
  console.log(req.user.role);
  if (req.user.role !== "mod") {
    return res
      .status(403)
      .json({ msg: "Access denied. Only moderators are allowed." });
  }
  next();
};
