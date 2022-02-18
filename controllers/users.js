const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user == null) {
    res.sendStatus(401);
    return;
  }
  user.comparePassword(password, function (err, isMatch) {
    if (err) throw err;
    console.log(password, isMatch);
    jwt.sign({ id: user._id }, process.env.SECRET_KEY, (err, token) => {
      if (err) res.sendStatus(500);
      else
        res.json({
          success: true,
          user: { _id: user._id, username: user.username },
          token: "Bearer " + token,
        });
    });
  });
};
exports.getUsers = async (req, res) => {
  const users = await User.find();
  if (users == null) {
    res.sendStatus(401);
    return;
  }
  res.json({
    success: true,
    users: users,
  });
};
