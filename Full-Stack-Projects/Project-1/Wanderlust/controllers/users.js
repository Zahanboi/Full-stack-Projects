const User = require("../models/user");

module.exports.getSignUpPage = (req, res) => {
   //check if user is authenticated or not
    res.render("../users/user.ejs");
}

module.exports.signupUser = async (req,res) => { //try and catch tp not just get error but also to handle the error in a user friendly way with req.user
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
        let redirectUrl = res.locals.redirectUrl || "/listings"; //if user has loggedin manually is not made to login via te isloogedin func so nothing stored in req.session.redirecturl as func never triggered so for that redirect to /listings
        res.redirect(redirectUrl); //if user is first time signing up
    })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}

module.exports.getloginPage = (req, res) => {
    res.render("../users/login.ejs");
}

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; //if user has loggedin manually is not made to login via te isloogedin func so nothing stored in req.session.redirecturl as func never triggered so for that redirect to /listings
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    if (req.user) {
        req.logout((err) => {//req.logout is a passport method to log out the user, it will remove the user from the session
        if(err){
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    })
    }else{
         req.flash("error", "No User logged in!");
         res.redirect("/listings");
    }
    
}