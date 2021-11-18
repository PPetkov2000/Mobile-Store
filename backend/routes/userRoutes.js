const router = require("express").Router();
const { getUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile, registerUser, authUser } = require("../controllers/userController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(isAuth, isAdmin, getUsers);
router.route("/profile").get(isAuth, getUserProfile).put(isAuth, updateUserProfile);
router.route("/:id").get(isAuth, isAdmin, getUserById).put(isAuth, isAdmin, updateUser).delete(isAuth, isAdmin, deleteUser);
router.route("/register").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
