const router = require("express").Router();
const { getUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile, addToFavourites, removeFromFavourites, registerUser, authUser } = require("../controllers/userController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(isAuth, isAdmin, getUsers);
router.route("/profile").get(isAuth, getUserProfile).put(isAuth, updateUserProfile);
router.route("/like").put(isAuth, addToFavourites);
router.route("/dislike").put(isAuth, removeFromFavourites);
router.route("/:id").get(isAuth, isAdmin, getUserById).put(isAuth, isAdmin, updateUser).delete(isAuth, isAdmin, deleteUser);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
