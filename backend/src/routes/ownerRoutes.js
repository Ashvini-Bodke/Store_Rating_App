const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware");
const { getOwnerDashboard , getStoreRatings} = require("../controller/ownerController");

router.get(
    "/owner-dashboard",
    verifyToken,
    getOwnerDashboard
);
router.get(
    "/ratings",
    verifyToken,
    getStoreRatings
);

module.exports = router;