const Listing = require("./models/listing");
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema  } = require("./utils/schemaValidate.js")

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) { // already stored in session by passport when serialise user
    req.session.redirectUrl = req.originalUrl; //store the original url user wnted to go to before he got stuck by this is logged in check and again redirect on that check by logging req object
    req.flash("error", "You must be logged in to perform this action!");
    return res.redirect("/login");
  }
  next();   
}

module.exports.isLoggedInReview = (req, res, next) => {
  if (!req.isAuthenticated()) { // already stored in session by passport when serialise user
    req.session.redirectUrl = `/listings/${req.params.id}`; //store the original url user wnted to go to before he got stuck by this is logged in check and again redirect on that check by logging req object
    req.flash("error", "You must be logged in to perform this action!");
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

module.exports.isOwner = async(req, res, next) => {
      let { id } = req.params; 
      const listing = await Listing.findById(id);
      if(!listing.owner.equals(res.locals.currUser._id) ) { 
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
      }//check if the owner of the listing is the same as the current user

      next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
      let { id, reviewId } = req.params; 
      const newReview = await Review.findById(reviewId);
      if(!newReview.author.equals(res.locals.currUser._id) ) { 
        req.flash("error", "You are not the owner of this review!");
        return res.redirect(`/listings/${id}`);
      }//check if the owner of the listing is the same as the current user

      next();
}

module.exports.validateSchema = (req, res, next) => {
  // console.log(listingSchema.validate(req.body));
 
  let {error} = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((e) => e.message).join(", "); //keep inside if block otherwise error as no error exist then no errMsg
    throw new ExpressError(500 , errMsg);
  }else{
    next();
  }
  
}

module.exports.validateReviewSchema = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
      
      if (error) {
        let errMsg = error.details.map((e) => e.message).join(", ");
        throw new ExpressError(500, errMsg);
      } else {
        next();
      }
}