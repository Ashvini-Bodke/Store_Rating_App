const db = require("../config/db");

const createStore = (req, res) => {

    const { name, email, address, owner_id } = req.body;

    if (!name || !email || !address) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query(
        "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)",
        [name, email, address, owner_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(201).json({
                message: "Store created successfully",
                storeId: result.insertId
            });
        }
    );
};

const getAllStores = (req, res) => {

    const search = req.query.search || "";

    const query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            ROUND(AVG(r.rating),1) AS overallRating
        FROM stores s
        LEFT JOIN ratings r
        ON s.id = r.store_id
        WHERE s.name LIKE ? OR s.address LIKE ?
        GROUP BY s.id, s.name, s.email, s.address
    `;

    db.query(
        query,
        [`%${search}%`, `%${search}%`],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json(results);
        }
    );
};


module.exports = {
    createStore,
    getAllStores,
    
};