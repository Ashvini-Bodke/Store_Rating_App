const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, address, password } = req.body;

        if (!name || !email || !address || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Database error" });
                }

                if (results.length > 0) {
                    return res.status(400).json({ message: "User already exists" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users (name, email, password, address, role) VALUES (?,?,?,?,?)",
                    [name, email, hashedPassword, address, "USER"],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: "Insert failed" });
                        }

                        return res.status(201).json({
                            message: "User registered successfully",
                            userId: result.insertId
                        });
                    }
                );
            }
        );

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// LOGIN FUNCTION
const login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (results.length === 0) {
                return res.status(400).json({
                    message: "Invalid Email"
                });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                message: "Login Successful",
                token,
                role: user.role
            });
        }
    );
};


const changePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        const userId = req.user.id;

        db.query(
            "SELECT * FROM users WHERE id = ?",
            [userId],
            async (err, results) => {

                if (err) {
                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                const user = results[0];

                const isMatch = await bcrypt.compare(
                    oldPassword,
                    user.password
                );

                if (!isMatch) {
                    return res.status(400).json({
                        message: "Old password is incorrect"
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(newPassword, 10);

                db.query(
                    "UPDATE users SET password=? WHERE id=?",
                    [hashedPassword, userId],
                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                message: "Update failed"
                            });
                        }

                        return res.status(200).json({
                            message: "Password updated successfully"
                        });
                    }
                );
            }
        );

    } catch (error) {

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    signup,
    login,
     changePassword
};