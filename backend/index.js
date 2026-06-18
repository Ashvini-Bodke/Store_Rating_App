require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");  // ✅ THIS IS CORRECT
const testRoutes = require("./src/routes/testRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const storeRoutes = require("./src/routes/storeRoutes");
const ratingRoutes =require("./src/routes/ratingRoutes");
const ownerRoutes = require("./src/routes/ownerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});