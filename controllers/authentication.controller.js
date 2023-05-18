const userModel = require("../model/user");
const adminModel = require("../model/admin");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      let error = new Error("Email or password is wrong.");
      error.status = 401;
      throw error;
    } else if ((user.password == req.body.password)) {
      let token = jwt.sign(
        {
          id: user._id,
          role: "user",
        },
        process.env.SECRET_1,
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
        process.env.SECRET_1,
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
