const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require("passport");
const user = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router({ mergeParams: true });

router.get("/signup" , (req, res) => {
   //check if user is authenticated or not
    res.render("../users/user.ejs");
});

router.get("/login", (req, res) => {
    res.render("../users/login.ejs");
});

router.post("/signup", wrapAsync(async (req,res) => {
    try{
    let { username, email, password } = req.body;
    let newUser = new User({email, username});
    // let existingUser = await User.findOne({ username});
    const registeredUser = await User.register(newUser, password); //no need to use user.save() as register method will save the user after hashing and salting the password
    console.log(registeredUser);
    req.login(registeredUser, (err) => { //automatically updates req.user and logs in new user when signing up
        if (err) {
            next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}))

router.post("/login", saveRedirectUrl , passport.authenticate("local", {
    failureRedirect: "/login", //if use successredirect then code inside not execute 
    failureFlash: true // for flash messages on failure similar to req.flash
}), wrapAsync(async (req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; //if user has loggedin manually is not made to login via te isloogedin func so nothing stored in req.session.redirecturl as func never triggered so for that redirect to /listings
    res.redirect(redirectUrl);

}))

router.get("/logout", (req, res) => {
    if (req.user) {
        req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    })
    }else{
        throw new ExpressError(500, "User must be logged in First!")
    }
    
});

module.exports = router;