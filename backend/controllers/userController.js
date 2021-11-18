const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const asyncWrapper = require("../middleware/asyncWrapper");
const { generateToken } = require("../utils/jwt");

const getUsers = asyncWrapper(async (req, res) => {
  const usersPerPage = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments();
  const users = await User.find().limit(usersPerPage).skip(usersPerPage * (page - 1)); // 8 * (1 - 1) = 0 skipped users on page 1 | 8 * (2 - 1) = 8 skipped users on page 2

  res.json({ users, page, pages: Math.ceil(count / usersPerPage) });
});

const getUserById = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate("favouriteProducts");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

const updateUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

const deleteUser = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

const getUserProfile = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").populate("favouriteProducts");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

const updateUserProfile = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favouriteProducts");

  if (user) {
    if (req.body.username && req.body.username !== user.username) {
      await Product.updateMany({ "reviews.creator": user._id }, { $set: { "reviews.$.name": req.body.username } });
      user.username = req.body.username;
    }
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      favouriteProducts: updatedUser.favouriteProducts,
      token: generateToken(updatedUser._id),
    });

    // res.json({ ...updatedUser, token: generateToken(updatedUser._id) });
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

const registerUser = asyncWrapper(async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  const userExists = await User.findOne({ email });

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (userExists) {
    res.status(400);
    throw new Error("Email is already taken");
  }

  const user = await User.create({ email, username, password });
  res.status(201).json({
    _id: user._id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

const authUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.passwordsMatch(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { getUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile, registerUser, authUser };
