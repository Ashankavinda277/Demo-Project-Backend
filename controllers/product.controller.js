const ProductCollection = require('../models/product.models');
const { cloudinary } = require('../config/cloudinary');

// Add Product with Image
exports.addProduct = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        const data = req.body;
        
        // If image is uploaded, add image URL and public ID
        if (req.file) {
            data.image = req.file.path;
            data.imagePublicId = req.file.filename;
        }

        console.log('Data to save:', data);

        const newProduct = new ProductCollection(data);
        await newProduct.save();
        
        res.status(201).send({
            message: "Product added successfully",
            data: newProduct
        });
    } catch (err) {
        console.error('Error:', err);
        
        // If product creation fails, delete uploaded image
        if (req.file && req.file.filename) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        
        res.status(500).send({
            message: err.message || "Error adding product"
        });
    }
};


exports.getProducts = async (req, res) => {
    try {
        const products = await ProductCollection.find();
        res.status(200).send({
            message: "Products received successfully",
            data: products
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error fetching products"
        });
    }
};

// Get Product by ID
exports.getProductsbyID = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductCollection.findById(id);
        
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        
        res.status(200).send({
            message: "Product received successfully",
            data: product
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error fetching product"
        });
    }
};

// Get Products by Name
exports.getProductsbyName = async (req, res) => {
    try {
        const name = req.params.name;
        const products = await ProductCollection.find({
            Product_Name: new RegExp(name, 'i')
        });
        
        res.status(200).send({
            message: "Products received successfully",
            data: products
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error fetching products"
        });
    }
};

// Get Products by Type
exports.getProductsbyType = async (req, res) => {
    try {
        const type = req.params.type;
        const products = await ProductCollection.find({ Product_Type: type });
        
        res.status(200).send({
            message: "Products received successfully",
            data: products
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error fetching products"
        });
    }
};

// Get Products by Price
exports.getProductsbyPrice = async (req, res) => {
    try {
        const price = req.params.price;
        const products = await ProductCollection.find({ Price: price });
        
        res.status(200).send({
            message: "Products received successfully",
            data: products
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error fetching products"
        });
    }
};

// Get Products by Weight
exports.getProductsbyWeight = async (req, res) => {
    try {
        const weight = req.params.weight;
        const products = await ProductCollection.find({ Weight: weight });
        
        res.status(200).send({
            message: "Products received successfully",
            data: products
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error fetching products"
        });
    }
};

// Replace Product (with Image handling)
exports.replaceProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        
        const existingProduct = await ProductCollection.findById(id);
        
        if (!existingProduct) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        
        if (req.file) {
            if (existingProduct.imagePublicId) {
                await cloudinary.uploader.destroy(existingProduct.imagePublicId);
            }
            
            data.image = req.file.path;
            data.imagePublicId = req.file.filename;
        }
        
        const result = await ProductCollection.findOneAndReplace(
            { _id: id },
            data,
            { new: true }
        );
        
        res.status(200).send({
            message: "Product replaced successfully",
            data: result
        });
    } catch (err) {
        if (req.file && req.file.filename) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        
        res.status(500).send({
            message: err.message || "Error replacing product"
        });
    }
};

// Update Product (with Image handling)
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        
        // Get the existing product
        const existingProduct = await ProductCollection.findById(id);
        
        if (!existingProduct) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        if (req.file) {
            if (existingProduct.imagePublicId) {
                await cloudinary.uploader.destroy(existingProduct.imagePublicId);
            }
            
            data.image = req.file.path;
            data.imagePublicId = req.file.filename;
        }
        
        const result = await ProductCollection.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        
        res.status(200).send({
            message: "Product updated successfully",
            data: result
        });
    } catch (err) {
        if (req.file && req.file.filename) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        
        res.status(500).send({
            message: err.message || "Error updating product"
        });
    }
};

// Delete Product (including Cloudinary image)
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductCollection.findById(id);
        
        if (!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }
        if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        }
        const result = await ProductCollection.findByIdAndDelete(id);
        
        res.status(200).send({
            message: "Product deleted successfully",
            data: result
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting product"
        });
    }
};