const Listing = require("../models/listing.js");

module.exports.allListings = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs" , {allListings})
}

module.exports.newListing = (req ,res) => {
    res.render("new.ejs");
}

module.exports.getListing = async (req,res) => {
  let {id} = req.params;
  const listings = await Listing.findById(id).populate( { 
    path: "reviews",
    populate: { 
      path: "author", //rattlio this is nested populating
    }, 
  }).populate("owner"); 
  if(!listings) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings"); //use return otherwise it will continue to execute the next line
  }
  res.render("show.ejs" , {listings} );
}

module.exports.createListing = async (req, res) => { //check is logged in if req comes from hoppscptch
  // const newlisitng = req.body;
  console.log(req.body.listing);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created Successfully!"); //flash message will be displayed for 3 seconds
  res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("edit.ejs" , {listing})
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //pass by deconstructing the req.body.listing object
  console.log(req.body.listing);
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
}