const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router({ mergeParams: true });
const userRoutes = require("../controllers/users");

router.route("/signup")
.get( userRoutes.getSignUpPage )
.post( saveRedirectUrl , wrapAsync(userRoutes.signupUser))

router.route("/login")
.get( userRoutes.getloginPage)
.post(saveRedirectUrl , passport.authenticate("local", {
    failureRedirect: "/login", //if use successredirect then code inside not execute 
    failureFlash: true // for flash messages on failure similar to req.flash
}), wrapAsync(userRoutes.loginUser))

router.get("/logout", userRoutes.logoutUser );

module.exports = router;