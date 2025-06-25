const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const { reviewSchema } = require("../utils/schemaValidate.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReviewSchema = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(", ");
    throw new ExpressError(500, errMsg);
  } else {
    next();
  }
}


router.post("/", validateReviewSchema , wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  console.log(req.body);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created Successfully!");
  res.redirect(`/listings/${id}`);
}));


//Delete ek single review of the listing
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
//update main listing doc and delete in review doc
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId }}); //pull operator removes the reviewId from the reviews array in the listing document as it identifies the array element to remove by its value
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;