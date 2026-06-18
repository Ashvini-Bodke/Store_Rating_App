const express = require("express");
const router = express.Router();

const { verifyToken, verifyRole } =
require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const { getDashboard, getAllUsers ,addUser} = require("../controller/adminController");

// router.get(
//     "/dashboard",
//     verifyToken,
//     authorizeRole("ADMIN"),
//     (req, res) => {

//         res.json({
//             message: "Welcome Admin"
//         });

//     }
// );

router.get(
    "/dashboard",
    verifyToken,
    authorizeRole("ADMIN"),
    getDashboard
);

router.get(
    "/users",
    verifyToken,
    verifyRole("ADMIN"),
    getAllUsers
);

router.post(
    "/add-user", 
    verifyToken, 
    authorizeRole("ADMIN"), 
    addUser);

module.exports = router;