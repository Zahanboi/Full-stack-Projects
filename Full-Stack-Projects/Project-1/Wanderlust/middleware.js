module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) { // already stored in session by passport when serialise user
    req.session.redirectUrl = req.originalUrl; //store the original url user wnted to go to before he got stuck by this is logged in check and again redirect on that
    req.flash("error", "You must be logged in to create a new listing!");
    return res.redirect("/login");
  }
  next();   
}

module.exports.saveRedirectUrl = (req,res,next) =>{// because passport resets session information after login so post request to /login so call this func or middleware before loggin a user
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
} 