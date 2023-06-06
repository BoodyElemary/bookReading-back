const userModel = require("../model/user");
const adminModel = require("../model/admin");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({"success":false, "message": "Email is wrong."});

    } else if ((user.password == req.body.password)) {
      let token = jwt.sign(
        {
          id: user._id,
          role: "user",
        },
        process.env.SECRET_1,
        { expiresIn: "8h" }
      );
      return res.status(200).json({ "success": true, token });
    } else {
      return res.status(401).json({"success":false, "message": "Password is wrong."});
    }
  } catch (error) {
    return res.status(500).json({"success":false, "message": error.message});
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const user = await adminModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({"success":false, "message": "YOU aren't admin."});

    } else if ((user.password == req.body.password)) {
      let token = jwt.sign(
        {
          id: user._id,
          role: "admin",
        },
        process.env.SECRET_1,
        { expiresIn: "8h" }
      );
      return res.status(200).json({ "success": true, token });
    } else {
      return res.status(401).json({"success":false, "message": "Password is wrong."});
    }
  } catch (error) {
    return res.status(500).json({"success":false, "message": error.message});
  }
};

exports.registerAdmin = async (req, res)=>{
  try {
    await adminModel.create(req.body)
    .then((admin)=>{return res.json({"success": true, "message": "admin added successfully", "data": admin });})
    .catch((error)=>{return res.json({"success": false, "message": error.message});})

  } catch (error) {
    return res.status(500).json({"success": false, "massage": error.message});
  }
}
