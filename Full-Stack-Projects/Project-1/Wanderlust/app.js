const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then((res)=>{
    console.log(res);
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.use(express.urlencoded({ extended: true }));
app.set("veiw engine" , "ejs");
app.set("views" , path.join(__dirname , "views/listings"));

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

app.get("/" , (req , res) =>{
res.send("Hello World");
});

app.get("/testlisting", async (req, res) => {
  let sampleListing = new Listing({
    title: "My new home",
    description: "By the beach",
    price: 1200,
    location: "Miami",
    country: "USA",
  });

  await sampleListing.save();
  console.log("data saved");
  res.send("Successful Testing");
  
})

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs" , {allListings})
});

app.get("/listings/new" , (req ,res) => {
  res.render("new.ejs");
}); // keep this route before id route as it will be treated as id

app.get("/listings/:id", async (req,res) => {
  let {id} = req.params;
  const listings = await Listing.findById(id);
  res.render("show.ejs" , {listings} );
})

app.post("/listings", async (req, res) => {
  // const {newlisitng} = req.body;
  // console.log(req.body.Listing);
  const newListing = new Listing(req.body.Listing);
  await newListing.save();
  res.redirect("/listings");
  
});