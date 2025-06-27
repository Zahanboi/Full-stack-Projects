const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js");
const listingRoute = require("./routes/listingRoutes.js");
const reviewRoute = require("./routes/reviewRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

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

const sessionOptions = {
  secret: "hiikey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // to prevent cross-site scripting attacks
  }
}

app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); //authenticate method is added by passport-local-mongoose add that in local strategy, it will check the username and password in the database and return the user if found, otherwise it will return false

passport.serializeUser(User.serializeUser());// to check user in out of the session
// serializeUser is used to store user information in the session, it stores the user id in the session
// deserializeUser is used to retrieve user information from the session, it retrieves the user id from the session and fetches the user from the database
passport.deserializeUser(User.deserializeUser());
// can implement self also all this logic
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.userauth = req.isAuthenticated(); // to check if user is authenticated or not
  next();
});

app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute); //keep routes after middleware so that it can access the id param adn other data
app.use("/", userRoutes);

app.get("/" , ((req , res) => {
  
  
res.send("Hello World");
}));

app.get("/home" , ((req , res) =>{
res.render("home.ejs");
console.log(req.user);
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




app.all("*", (req, res) => {
  let message = "Page not found";
  throw new ExpressError(404, message);
});

app.use((err, req, res, next) => {
  let {statusCode = 500 , message} = err
  res.status(statusCode).render("../error.ejs", {message});
  console.log(message);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});