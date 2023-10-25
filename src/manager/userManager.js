const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.register = async (userData) => {
  // validation easier variant!
  //   const user = await User.findOne({ email: userData.email });
  //   if (user) {
  //     throw new Error("Email exists!");
  //   }

  const createdUser = await User.create(userData);
  const token = await tokenGenerator(createdUser);
  return token;
};

exports.login = async (email, password) => {
  if (email == "" || password == "") {
    throw new Error("Fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password does not exists or ivalid E!");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Username or password does not exists or ivalid P!");
  }
  const token = await tokenGenerator(user);
  return token;
};

//token generator!
async function tokenGenerator(user) {
  //change what you need !!!
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
}
