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

exports.viewAllAdmins = async (req, res) => {
    try {
        const admins = await adminCollection.find();
        res.status(200).json({ message: "Admins retrieved successfully", admins });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admins", error });
    }
};

exports.viewAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
     const admin = await adminCollection.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin retrieved successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admin", error });
    }
};

exports.viewAdminByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const admin = await adminCollection.find({ username: username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin retrieved successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admin", error });
    }
};

exports.viewAdminByEmail =async(req,res)=>{
    try{
        const email=req.params.email;
        const admin=await adminCollection.find({"email":email});
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin retrieved successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admin", error });
    }
};

exports.viewAdminByAddress = async (req, res) => {
    try {
        const address = req.params.address;
        const admin = await adminCollection.find({ address: address });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin retrieved successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving admin", error });
    }
};


exports.updateAdmin =async(req,res)=>{
    try{
        const adminId=req.params.id;
        const updateData=req.body;
        const updatedAdmin=await adminCollection.findByIdAndUpdate(adminId,updateData, {new:true});
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error updating admin", error });
    }
};

exports.deleteAdmin = async(req,res)=>{
    try {
        const adminId = req.params.id;
        const deletedAdmin = await adminCollection.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully", admin: deletedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error deleting admin", error });
    }
};
