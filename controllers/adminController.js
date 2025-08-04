const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const existing = await Admin.findOne({ where: { username } });
        if (existing) {
            return res.status(409).json({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: newAdmin.id,
                username: newAdmin.username,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};



const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) return res.status(401).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        return res.json({
            message: 'Login success',
            token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { loginAdmin, createAdmin };
