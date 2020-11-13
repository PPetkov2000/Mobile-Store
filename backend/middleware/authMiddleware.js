const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const isAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.userId).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { isAuth, isAdmin };
