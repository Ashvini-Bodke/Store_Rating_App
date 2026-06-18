const db = require("../config/db");

const getOwnerDashboard = (req, res) => {
    const ownerId = req.user.id;

    const query = `
        SELECT 
            s.id,
            s.name,
            COUNT(r.id) AS totalRatings,
            COALESCE(ROUND(AVG(r.rating),1), 0) AS averageRating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE s.owner_id = ?
        GROUP BY s.id
    `;

    db.query(query, [ownerId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }

        return res.status(200).json(results);
    });
};

const getStoreRatings = (req, res) => {
    const ownerId = req.user.id;

    const query = `
        SELECT 
            u.id,
            u.name,
            u.email,
            r.rating
        FROM ratings r
        JOIN users u ON r.user_id = u.id
        JOIN stores s ON r.store_id = s.id
        WHERE s.owner_id = ?
        ORDER BY r.id DESC
    `;

    db.query(query, [ownerId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }

        return res.status(200).json(results);
    });
};

module.exports = {
    getOwnerDashboard,
    getStoreRatings
};