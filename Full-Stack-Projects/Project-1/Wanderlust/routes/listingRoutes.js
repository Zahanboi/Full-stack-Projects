const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateSchema } = require("../middleware.js");
const listingRoutes = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../utils/cloudConfig.js")
const upload = multer({ storage })


router.route("/")
.get(wrapAsync(listingRoutes.allListings))
.post(isLoggedIn, upload.single("listing[image]"), validateSchema, wrapAsync(listingRoutes.createListing));// multer will parse the image and save to cloudinary after it's parsed then call validate schema to validate it

router.get("/new" , isLoggedIn , (listingRoutes.newListing)); // keep this route before id route as it will be treated as id if not

router.route("/:id")
.get(wrapAsync(listingRoutes.getListing))
.put(isLoggedIn , isOwner , upload.single("listing[image][url]") , validateSchema, wrapAsync(listingRoutes.updateListing))//keep name same as comming in form as listing[image][url]
.delete( isLoggedIn , isOwner , wrapAsync(listingRoutes.destroyListing))

router.get("/:id/edit" , isLoggedIn ,isOwner , wrapAsync(listingRoutes.editListing));

module.exports = router;