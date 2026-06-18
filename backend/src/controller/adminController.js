const db = require("../config/db");
const bcrypt = require("bcryptjs");

const getDashboard = (req, res) => {

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err, usersResult) => {

            if (err) {
                return res.status(500).json({ message: err.message });
            }

            db.query(
                "SELECT COUNT(*) AS totalStores FROM stores",
                (err, storesResult) => {

                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }

                    db.query(
                        "SELECT COUNT(*) AS totalRatings FROM ratings",
                        (err, ratingsResult) => {

                            if (err) {
                                return res.status(500).json({ message: err.message });
                            }

                            res.json({
                                totalUsers: usersResult[0].totalUsers,
                                totalStores: storesResult[0].totalStores,
                                totalRatings: ratingsResult[0].totalRatings
                            });
                        }
                    );
                }
            );
        }
    );
};

const getAllUsers = (req, res) => {

    const query = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
    `;

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        return res.status(200).json(results);
    });
};


const addUser = async (req, res) => {

    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !address || !role) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (name, email, password, address, role)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [name, email, hashedPassword, address, role],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                return res.status(201).json({
                    message: "User created successfully",
                    userId: result.insertId
                });
            }
        );

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};



module.exports = { getDashboard,  getAllUsers,addUser };