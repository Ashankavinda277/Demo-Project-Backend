const CustomerCollection = require("../models/customer.model");
const {params} = require("../routes/costomer.route");

exports.addCustomer = async (req, res) => {
   try{
    const data = req.body;
    const newCustomer = new CustomerCollection(data);
    await newCustomer.save();
    res.status(200).send({
        message: "Customer added successfully",
        data: newCustomer
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.getcustomer= async (req, res) => {              
   try{
    const customers = await CustomerCollection.find();
    res.status(200).send({
        message: "Customers recieved successfully",
        data: customers
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.getcustomerbyID  = async (req, res) => {              
   const id = req.params.id;             
   try{
    const customers = await CustomerCollection.findById(id);
    res.status(200).send({
        message: "Customers recieved successfully",
        data: customers
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};


exports.getcustomerbyName= async (req, res) => {              
    const name = req.params.name;                        
   try{
    const customers = await CustomerCollection.find({'Cutomer_Name':name});
    res.status(200).send({
        message: "Customers recieved successfully",
        data: customers
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.getcustomerbyEmail=async (req, res) => {              
    const email= req.params.email;                      
   try{
    const customers = await CustomerCollection.find({'Email':email});
    res.status(200).send({
        message: "Customers recieved successfully",
        data: customers
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.replaceCustomer = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const result = await CustomerCollection.findOneAndReplace({_id:id},data,{new:true});
        res.status(200).send({
            message: "Customer replaced successfully",
            data: result
        });
    }catch(err){
        res.status(500).send({
            message : err
        });
    }
};

exports.updateCustomer = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const result = await CustomerCollection.findByIdAndUpdate(id,data,{new:true});
        res.status(200).send({
            message: "Customer updated successfully",
            data: result
        });
    } catch(err){
        res.status(500).send({
            message : err
        });
    }
};

exports.deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try{
        const result = await CustomerCollection.findByIdAndDelete(id);
        res.status(200).send({
            message: "Customer deleted successfully",
            data: result
        });
    }
    catch(err){
        res.status(500).send({
            message : err
        });
    }
};