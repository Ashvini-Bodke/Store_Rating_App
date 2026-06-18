const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/authMiddleware");
const { signup , login,changePassword} = require("../controller/authController");


router.post("/signup", signup);
router.post("/login", login);
router.put(
    "/change-password",
    verifyToken,
    changePassword
    
);
console.log("verifyToken =", verifyToken);
console.log("changePassword =", changePassword);

module.exports = router;