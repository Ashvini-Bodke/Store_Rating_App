const db = require("../config/db");

const addOrUpdateRating = (req, res) => {

    const { store_id, rating } = req.body;
    const user_id = req.user.id;

    if (!store_id || !rating) {
        return res.status(400).json({ message: "Missing fields" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    const query = `
        INSERT INTO ratings (user_id, store_id, rating)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE rating = VALUES(rating)
    `;

    db.query(query, [user_id, store_id, rating], (err, result) => {

        if (err) {
            return res.status(500).json({ message: err.message });
        }

        return res.status(200).json({
            message: "Rating saved successfully"
        });
    });
};

const getMyRatings = (req, res) => {

    const user_id = req.user.id;

    db.query(
        "SELECT store_id, rating FROM ratings WHERE user_id=?",
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({ message: err.message });
            }

            return res.json(result);
        }
    );
};

module.exports = {
    addOrUpdateRating,
    getMyRatings
};