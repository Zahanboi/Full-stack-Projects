const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
// const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./utils/schemaValidate.js")
const { reviewSchema } = require("./utils/schemaValidate.js");
const Review = require("./models/review.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then((res)=>{
    console.log(res);
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(express.urlencoded({ extended: true }));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views/listings"));
app.use(express.static(path.join(__dirname, "public")));

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

const validateReviewSchema = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(", ");
    throw new ExpressError(500, errMsg);
  } else {
    next();
  }
}

app.get("/" , ((req , res) => {
res.send("Hello World");
}));

app.get("/home" , ((req , res) =>{
res.render("home.ejs");
}));

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new home",
//     description: "By the beach",
//     price: 1200,
//     location: "Miami",
//     country: "USA"
//   });

//   await sampleListing.save();
//   console.log("data saved");
//   res.send("Successful Testing");
  
// })

app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs" , {allListings})
}));

app.get("/listings/new" , ((req ,res) => {
   res.render("new.ejs");
})); // keep this route before id route as it will be treated as id if not

app.get("/listings/:id", wrapAsync(async (req,res) => {
  let {id} = req.params;
  const listings = await Listing.findById(id).populate("reviews"); 
  res.render("show.ejs" , {listings} );
}));

app.post("/listings", validateSchema, wrapAsync(async (req, res) => {
  // const newlisitng = req.body;
  console.log(req.body.listing);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

app.post("/listings/:id/reviews", validateReviewSchema , wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  console.log(req.body);
  let newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${id}`);
}));

app.get("/listings/:id/edit" , wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("edit.ejs" , {listing})
}));

//Update Route
app.put("/listings/:id", validateSchema, wrapAsync(async (req, res) => {
  let { id } = req.params;
  
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //pass by deconstructing the req.body.listing object
  console.log(req.body.listing);
  
  res.redirect(`/listings/${id}`);
}));

//delete this
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

//Delete ek single review of the listing
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
//update main listing doc and delete in review doc
  await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId }}); //pull operator removes the reviewId from the reviews array in the listing document as it identifies the array element to remove by its value
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

app.all("*", (req, res) => {
  let message = "Page not found";
  throw new ExpressError(404, message);
});

app.use((err, req, res, next) => {
  let {statusCode = 500 , message} = err
  res.status(statusCode).render("error.ejs", {message});
  console.log(message);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});