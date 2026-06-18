const db = require("../config/db");

const submitRating = (req, res) => {

    const { store_id, rating } = req.body;

    const user_id = req.user.id;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    db.query(
        "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)",
        [user_id, store_id, rating],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(201).json({
                message: "Rating submitted successfully"
            });
        }
    );
};

const updateRating = (req, res) => {

    const { store_id, rating } = req.body;

    const user_id = req.user.id;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    db.query(
        "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?",
        [rating, user_id, store_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                message: "Rating updated successfully"
            });
        }
    );
};

module.exports = {
    submitRating,
     updateRating
};