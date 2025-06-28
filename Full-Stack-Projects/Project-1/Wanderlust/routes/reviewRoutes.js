const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReviewSchema, isLoggedInReview, isReviewAuthor } = require("../middleware.js");
const reviewRoutes = require("../controllers/review.js")

router.get("/" , isLoggedInReview);

router.post("/", isLoggedInReview , validateReviewSchema , wrapAsync(reviewRoutes.createNewReview));

//Delete ek single review of the listing , isreview author check separately and not use isloggedin use separate isloggedinreview because after delete review non existing path to redirect if login check so set new req.session.redorecturl
router.delete("/:reviewId", isLoggedInReview, isReviewAuthor , wrapAsync(reviewRoutes.destroyReview));

module.exports = router;