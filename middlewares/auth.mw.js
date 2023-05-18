const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization");
    if (!token) {
      let error = new Error("Not authrized.");
      error.status = 403;
      next(error);
    }
    let decodedToken = jwt.verify(token.split(" ")[1], process.env.SECRET_1);
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isAuther = (req, res, next) => {
  if (req.decodedToken.role === "auther") {
    next();
  } else {
    let error = new Error("Not authrized.");
    error.status = 403;
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.decodedToken.role === "admin") {
    next();
  } else {
    let error = new Error("Not authrized.");
    error.status = 403;
    next(error);
  }
};

module.exports.isSameAuther = (req, res, next) => {
  if (
    req.decodedToken.role === "auther" &&
    req.decodedToken.id === req.body.id
  ) {
    next();
  } else {
    let error = new Error("Not authrized.");
    error.status = 403;
    next(error);
  }
};

module.exports.isAdminOrAuther = (req, res, next) => {
  if (req.decodedToken.role === "admin" || eq.decodedToken.role === "auther") {
    next();
  } else {
    let error = new Error("Not authrized.");
    error.status = 403;
    next(error);
  }
};
