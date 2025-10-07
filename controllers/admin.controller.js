const adminCollection = require("../models/admin.model");

exports.createAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        const newAdmin = new adminCollection(adminData);
        await newAdmin.save();
        res.status(200).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error });
    }
};
