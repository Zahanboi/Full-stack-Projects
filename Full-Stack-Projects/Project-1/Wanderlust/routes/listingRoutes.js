const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateSchema } = require("../middleware.js");
const listingRoutes = require("../controllers/listing.js")

router.route("/")
.get(wrapAsync(listingRoutes.allListings))
.post(isLoggedIn , validateSchema, wrapAsync(listingRoutes.createListing));

router.get("/new" , isLoggedIn , (listingRoutes.newListing)); // keep this route before id route as it will be treated as id if not

router.route("/:id")
.get(wrapAsync(listingRoutes.getListing))
.put(isLoggedIn , isOwner , validateSchema, wrapAsync(listingRoutes.updateListing))
.delete( isLoggedIn , isOwner , wrapAsync(listingRoutes.destroyListing))

router.get("/:id/edit" , isLoggedIn ,isOwner , wrapAsync(listingRoutes.editListing));

module.exports = router;