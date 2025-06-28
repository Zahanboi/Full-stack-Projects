const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createNewReview = async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  console.log(req.body);
  
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  let reviewAuthor = await newReview.populate("author");
  console.log(reviewAuthor);
  req.flash("success", "New Review Created Successfully!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
//update main listing doc and delete in review doc
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId }}); //pull operator removes the reviewId from the reviews array in the listing document as it identifies the array element to remove by its value
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully!");
  res.redirect(`/listings/${id}`);
}