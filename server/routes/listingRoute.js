const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  creatingListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} = require("../controllers/listingController");

const router = express.Router();

router.post("/create", verifyToken, creatingListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

module.exports = router;
