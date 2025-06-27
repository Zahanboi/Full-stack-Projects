const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../utils/schemaValidate.js")
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const validateSchema = (req , res , next) => {
  // console.log(listingSchema.validate(req.body));
 
  let {error} = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((e) => e.message).join(", "); //keep inside if block otherwise error as no error exist then no errMsg
    throw new ExpressError(500 , errMsg);
  }else{
    next();
  }
  
}

router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs" , {allListings})
}));

router.get("/new" , isLoggedIn , ((req ,res) => {
  
    res.render("new.ejs");
})); // keep this route before id route as it will be treated as id if not

router.get("/:id", wrapAsync(async (req,res) => {
  let {id} = req.params;
  const listings = await Listing.findById(id).populate("reviews"); 
  if(!listings) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings"); //use return otherwise it will continue to execute the next line
  }
  res.render("show.ejs" , {listings} );
}));

router.post("/", isLoggedIn , validateSchema, wrapAsync(async (req, res) => { //check is logged in if req comes from hoppscptch
  // const newlisitng = req.body;
  console.log(req.body.listing);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success", "New Listing Created Successfully!"); //flash message will be displayed for 3 seconds
  res.redirect("/listings");
}));

router.get("/:id/edit" , isLoggedIn , wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("edit.ejs" , {listing})
}));

//Update Route
router.put("/:id", isLoggedIn , validateSchema, wrapAsync(async (req, res) => {
  let { id } = req.params;
  
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //pass by deconstructing the req.body.listing object
  console.log(req.body.listing);
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
}));

//delete this
router.delete("/:id", isLoggedIn , wrapAsync(async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
}));

module.exports = router;