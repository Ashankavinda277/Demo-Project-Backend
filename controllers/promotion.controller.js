const PromotionCollection = require("../models/promotion.model");
const { cloudinary } = require('../config/cloudinary');

exports.addPromotion = async (req, res) => {
    try {
        const { Promotion_Name, Discount_Price, End_Date, Description, Weight, Current_Price } = req.body;

        
        if (!Promotion_Name || !Discount_Price || !End_Date || !Description || !Weight || !Current_Price) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        
        let iconUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'promotions',
                resource_type: 'auto'
            });
            iconUrl = result.secure_url;
        }

        const newPromotion = new PromotionCollection({
            Promotion_Name,
            Discount_Price: parseFloat(Discount_Price),
            End_Date,
            Description,
            Weight,
            Current_Price: parseFloat(Current_Price),
            Icon: iconUrl
        });

        await newPromotion.save();

        res.status(200).send({
            message: "Promotion added successfully",
            data: newPromotion
        });

    } catch (err) {
        console.error("Error adding promotion:", err);
        res.status(500).send({
            message: err.message || "Error adding promotion",
            error: err.toString()
        });
    }
};

exports.getPromotion = async (req, res) => {
    try {
        const promotion = await PromotionCollection.find();
        res.status(200).send({
            message: "Promotions received successfully",
            data: promotion
        });

    } catch (err) {
        console.error("Error fetching promotions:", err);
        res.status(500).send({
            message: err.message || "Error fetching promotions"
        });
    }
};

exports.getPromotionbyId = async (req, res) => {
    const id = req.params.id;
    try {
        const promotion = await PromotionCollection.findById(id);

        if (!promotion) {
            return res.status(404).send({
                message: "Promotion not found"
            });
        }

        res.status(200).send({
            message: "Promotion received successfully",
            data: promotion
        });

    } catch (err) {
        console.error("Error fetching promotion by ID:", err);
        res.status(500).send({
            message: err.message || "Error fetching promotion"
        });
    }
};

exports.getPromotionbyName = async (req, res) => {
    const name = req.params.name;
    try {
        const promotion = await PromotionCollection.find({
            Promotion_Name: { $regex: name, $options: 'i' }
        });

        res.status(200).send({
            message: "Promotions received successfully",
            data: promotion
        });

    } catch (err) {
        console.error("Error fetching promotions by name:", err);
        res.status(500).send({
            message: err.message || "Error fetching promotions"
        });
    }
};

exports.getActivePromotions = async (req, res) => {
    try {
        const currentDate = new Date();
        const promotions = await PromotionCollection.find({
            End_Date: { $gte: currentDate }
        }).sort({ End_Date: 1 });

        res.status(200).send({
            message: "Active promotions received successfully",
            data: promotions
        });

    } catch (err) {
        console.error("Error fetching active promotions:", err);
        res.status(500).send({
            message: err.message || "Error fetching active promotions"
        });
    }
};

exports.getExpiredPromotions = async (req, res) => {
    try {
        const currentDate = new Date();
        const promotions = await PromotionCollection.find({
            End_Date: { $lt: currentDate }
        }).sort({ End_Date: -1 });

        res.status(200).send({
            message: "Expired promotions received successfully",
            data: promotions
        });

    } catch (err) {
        console.error("Error fetching expired promotions:", err);
        res.status(500).send({
            message: err.message || "Error fetching expired promotions"
        });
    }
};

exports.getPromotionbyEndDate = async (req, res) => {
    const EndDate = req.params.EndDate;
    try {
        const promotion = await PromotionCollection.find({ End_Date: EndDate });
        res.status(200).send({
            message: "Promotions received successfully",
            data: promotion
        });

    } catch (err) {
        console.error("Error fetching promotions by end date:", err);
        res.status(500).send({
            message: err.message || "Error fetching promotions"
        });
    }
};

exports.replacePromotion = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const result = await PromotionCollection.findOneAndReplace({ _id: id }, data, { new: true });

        if (!result) {
            return res.status(404).send({
                message: "Promotion not found"
            });
        }

        res.status(200).send({
            message: "Promotion replaced successfully",
            data: result
        });
    } catch (err) {
        console.error("Error replacing promotion:", err);
        res.status(500).send({
            message: err.message || "Error replacing promotion"
        });
    }
};

exports.updatePromotion = async (req, res) => {
    const id = req.params.id;

    try {
        
        let updateData = { ...req.body };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'promotions',
                resource_type: 'auto'
            });
            updateData.Icon = result.secure_url;
        }

        const result = await PromotionCollection.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!result) {
            return res.status(404).send({
                message: "Promotion not found"
            });
        }

        res.status(200).send({
            message: "Promotion updated successfully",
            data: result
        });
    } catch (err) {
        console.error("Error updating promotion:", err);
        res.status(500).send({
            message: err.message || "Error updating promotion"
        });
    }
};

exports.deletePromotion = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await PromotionCollection.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "Promotion not found"
            });
        }

        res.status(200).send({
            message: "Promotion deleted successfully",
            data: result
        });
    } catch (err) {
        console.error("Error deleting promotion:", err);
        res.status(500).send({
            message: err.message || "Error deleting promotion"
        });
    }
};