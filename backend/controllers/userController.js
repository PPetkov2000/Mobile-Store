const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const generateToken = require("../utils/generateToken");

const getUsers = async (req, res, next) => {
  const usersPerPage = 8;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await User.countDocuments();
    const users = await User.find()
      .limit(usersPerPage)
      .skip(usersPerPage * (page - 1)); // 8 * (1 - 1) = 0 skipped users on page 1 | 8 * (2 - 1) = 8 skipped users on page 2

    res.json({ users, page, pages: Math.ceil(count / usersPerPage) });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("favouriteProducts");

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
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
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("favouriteProducts");

    if (user) {
      res.json(user);
      // res.json({
      //   _id: user._id,
      //   email: user.email,
      //   username: user.username,
      //   isAdmin: user.isAdmin,
      // });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "favouriteProducts"
    );

    if (user) {
      if (req.body.username && req.body.username !== user.username) {
        await Product.updateMany(
          { "reviews.creator": user._id },
          { $set: { "reviews.$.name": req.body.username } }
        );
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
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const addToFavourites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (user.favouriteProducts.includes(req.body.productId)) {
        res.status(400);
        throw new Error("Product is already in favourites");
      }

      user.favouriteProducts.push(req.body.productId);

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const removeFromFavourites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (!user.favouriteProducts.includes(req.body.productId)) {
        res.status(400);
        throw new Error("Product is already removed");
      }
      user.favouriteProducts = user.favouriteProducts.filter(
        (x) => x._id.toString() !== req.body.productId
      );

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { email, username, password, confirmPassword } = req.body;

  try {
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
  } catch (error) {
    next(error);
  }
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  addToFavourites,
  removeFromFavourites,
  registerUser,
  authUser,
};
