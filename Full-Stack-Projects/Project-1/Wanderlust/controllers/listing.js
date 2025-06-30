const Listing = require("../models/listing.js");
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});


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
module.exports.createListing = async (req, res) => {
  const location = req.body.listing.location;

  let response = await client.geocode({
    params: {
      address: location,
      key: process.env.API_KEY,
    },
  });

  if (response.data.status !== "OK" || response.data.results.length === 0) {
    req.flash("error", "Invalid address — please enter a valid location.");
    return res.redirect("/listings/new");
  }

  const { lat, lng } = response.data.results[0].geometry.location;
  const { path: url, filename } = req.file;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = {
  type: "Point",
  coordinates: [lng, lat]
};

  await newListing.save();
  console.log(newListing);
  
  req.flash("success", "New Listing Created Successfully!");
  res.redirect("/listings");
};


module.exports.editListing = async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  
  if(!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  let imageOriginalURL = listing.image.url;
  imageOriginalURL = imageOriginalURL.replace("/upload" , "/upload/h_300,w_250"); 
//     imageOriginalURL = imageOriginalURL.replace("/upload" , "/upload/h_250,w_250,e_zoompan:mode_ofr;maxzoom_2.2;du_4;fps_30/"); 
//   imageOriginalURL = imageOriginalURL.replace(".jpg" , ".gif"); 

  res.render("edit.ejs" , {listing , imageOriginalURL})
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const location = req.body.listing.location;

  let response = await client.geocode({
    params: {
      address: location,
      key: process.env.API_KEY,
    },
  });

  if (response.data.status !== "OK" || response.data.results.length === 0) {
    req.flash("error", "Invalid address — please enter a valid location.");
    return res.redirect("/listings/new");
  }

  const { lat, lng } = response.data.results[0].geometry.location;

  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //pass by deconstructing the req.body.listing object
  console.log(req.file);
  if (typeof req.file !== "undefined") {// if user send empty no image
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
  }

  listing.geometry = {
    type: "Point",
    coordinates: [lng, lat]
    };
    await listing.save();

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
}