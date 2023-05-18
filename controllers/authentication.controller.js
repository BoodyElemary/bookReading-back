const authorModel = require("../model/authors");
const adminModel = require("../model/admin");
const jwt = require("jsonwebtoken");
const tokenKey = process.env.SECRET_1;

exports.login = async (req, res, next) => {
  try {
    const auther = await authorModel.findOne({ email: req.body.email });
    if (!auther) {
      let error = new Error("Email or password is wrong.");
      error.status = 401;
      throw error;
    } else if ((auther.password = req.body.password)) {
      let token = jwt.sign(
        {
          id: auther._id,
          role: "auther",
        },
        tokenKey,
        { expiresIn: "8h" }
      );
      res.status(200).json({ message: "ok", token });
    } else {
      let error = new Error("Email or password is wrong.");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!adminModel) {
      let error = new Error("Email or password is wrong.");
      error.status = 401;
      throw error;
    } else if ((admin.password = req.body.password)) {
      let token = jwt.sign(
        {
          id: admin._id,
          role: "admin",
        },
        tokenKey,
        { expiresIn: "8h" }
      );
      res.status(200).json({ message: "ok", token });
    } else {
      let error = new Error("Email or password is wrong.");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
