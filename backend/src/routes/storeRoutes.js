const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const { createStore, getAllStores} = require("../controller/storeController");

router.post(
    "/",
    verifyToken,
    authorizeRole("ADMIN"),
    createStore,
  
);

router.get(
    "/",
    verifyToken,
    getAllStores
);


module.exports = router;