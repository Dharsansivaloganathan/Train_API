const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const { User } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //if(password != (65 && 91) || ())
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the details");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      password: user.password,
      email: user.email,
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    res.status(200).json({
      email: findUser.email,
      name: findUser.name,
      password: findUser.password,
      _id: findUser._id,
      token: findUser.token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

// const authAdmin = asyncHandler(async (req, res) => {
//     const { username, password } = req.body
//     const findAdmin = await Admin.findOne({ username })
//     if (findAdmin && await bcrypt.compare(password, findAdmin.password)) {
//         res.status(200).json({
//             name: findAdmin.username,
//             password: findAdmin.password,
//             _id: findAdmin._id,
//             token: findAdmin.token,

//         })
//     } else {
//         res.status(400)
//         throw new Error("Not an Admin")
//     }
// })
module.exports = {
  registerUser,
  authUser,
};
