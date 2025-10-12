const ProductCollection = require('../models/product.models');
const { params } = require('../routes/product.route');

exports.addProduct = async (req, res) => {
    
       try{
        const data = req.body;
        const newProduct = new ProductCollection(data);
        await newProduct.save();
        res.status(200).send({
            message: "Product added successfully",
            data: newProduct
        });
    
       }
       catch(err){
        res.status(500).send({
            message : err
        })
       }
    };

    exports.getProducts = async (req, res) => {
        try{
            const products = await ProductCollection.find();
            res.status(200).send({
                message: "Products received successfully",
                data: products
            })
        }
        catch(err){
            res.status(500).send({
                message: err
            })
        }
    };

     exports.getProductsbyID = async (req, res) => {
        try{
            const id= req.params.id;
            const products = await ProductCollection.findById(id);
            res.status(200).send({
                message: "Products received successfully",
                data: products
            })
        }
        catch(err){
            res.status(500).send({
                message: err
            })
        }
    };

      exports.getProductsbyName = async (req, res) => {
        try{
            const name = req.params.name;
            const products = await ProductCollection.find({Product_Name: name});
            res.status(200).send({
                message: "Products received successfully",
                data: products
            })
        }
        catch(err){
            res.status(500).send({
                message: err
            })
        }
    };

     exports.getProductsbyType = async (req, res) => {
        try{
            const type = req.params.type;
            const products = await ProductCollection.find({Product_Type: type });
            res.status(200).send({
                message: "Products received successfully",
                data: products
            })
        }
        catch(err){
            res.status(500).send({
                message: err
            })
        }
    };

     exports.getProductsbyPrice = async (req, res) => {
        try{
            const price = req.params.price;
            const products = await ProductCollection.find({Price: price });
            res.status(200).send({
                message: "Products received successfully",
                data: products
            })
        }
        catch(err){
            res.status(500).send({
                message: err
            })
        }
    };

      exports.getProductsbyWeight = async (req, res) => {
        try{
            const weight = req.params.weight;
            const products = await ProductCollection.find({Weight: weight });
            res.status(200).send({
                message: "Products received successfully",
                data: products
            })
        }
        catch(err){
            res.status(500).send({
                message: err
            })
        }
    };

    exports.replaceProduct = async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try{
            const result = await ProductCollection.findOneAndReplace({_id:id},data,{new:true});
            res.status(200).send({
                message: "Product replaced successfully",
                data: result
            });
        }
        
        catch(err){
            res.status(500).send({
                message : err
            });
        }
    };

    exports.updateProduct = async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try{
            const result = await ProductCollection.findByIdAndUpdate(id,data,{new:true});
            res.status(200).send({
                message: "Product updated successfully",
                data: result
            });
        }
        catch(err){
            res.status(500).send({
                message : err
            });
        }
    };

    exports.deleteProduct = async (req, res) => {
        const id = req.params.id;
        try{
            const result = await ProductCollection.findByIdAndDelete(id);
            res.status(200).send({
                message: "Product deleted successfully",
                data: result
            });
        }
        catch(err){
            res.staus(500).send({
                message : err
            });
        }
    };

    





