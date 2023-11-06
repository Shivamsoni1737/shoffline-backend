const express = require("express");
const { register, login, logout, myProfile } = require("../controller/user");
const { dregister } = require("../controller/dummy");
// const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(/*isAuthenticated,*/ myProfile);
router.route("/dummy/register").post(dregister);

module.exports = router;
