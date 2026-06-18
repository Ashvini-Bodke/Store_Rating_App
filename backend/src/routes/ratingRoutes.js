const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware");

const { submitRating, updateRating } =
require("../controller/ratingController");

router.post(
    "/",
    verifyToken,
    submitRating
);
router.put(
    "/",
    verifyToken,
    updateRating
);

module.exports = router;