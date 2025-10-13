const PromotionCollection = require("../models/promotion.model");
const {params} = require("../routes/promotion.routes");

exports.addPromotion = async (req, res) => {
   try{
    const data = req.body;
    const newPromotion = new PromotionCollection(data);
    await newPromotion.save();
    res.status(200).send({
        message: "Promotion added successfully",
        data: newPromotion
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.getPromotion= async (req, res) => {              
   try{
    const promotion = await PromotionCollection.find();
    res.status(200).send({
        message: "Promotions recieved successfully",
        data: promotion
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.getPromotionbyId  = async (req, res) => {              
   const id = req.params.id;             
   try{
    const promotion = await PromotionCollection.findById(id);
    res.status(200).send({
        message: "Promotion recieved successfully",
        data: promotion
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

exports.getPromotionbyName  = async (req, res) => {              
   const name = req.params.name;             
   try{
    const promotion = await PromotionCollection.find({Promotion_Name:name});
    res.status(200).send({
        message: "Promotion recieved successfully",
        data: promotion
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

// exports.getPromotionbyType  = async (req, res) => {              
//    const type = req.params.type;             
//    try{
//     const promotion = await PromotionCollection.find({Promotion_Type:type});
//     res.status(200).send({
//         message: "Promotion recieved successfully",
//         data: promotion
//     });

//    }
//    catch(err){
//     res.status(500).send({
//         message : err
//     })
//    }
// };

// exports.getPromotionbyStartDate  = async (req, res) => {              
//    const StartDate = req.params.StartDate;             
//    try{
//     const promotion = await PromotionCollection.find({Start_Date:StartDate});
//     res.status(200).send({
//         message: "Promotion recieved successfully",
//         data: promotion
//     });

//    }
//    catch(err){
//     res.status(500).send({
//         message : err
//     })
//    }
// };

exports.getPromotionbyEndDate  = async (req, res) => {              
   const EndDate = req.params.EndDate;             
   try{
    const promotion = await PromotionCollection.find({End_Date:EndDate});
    res.status(200).send({
        message: "Promotion recieved successfully",
        data: promotion
    });

   }
   catch(err){
    res.status(500).send({
        message : err
    })
   }
};

// exports.replacePromotion = async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     try{
//         const result = await PromotionCollection.findOneAndReplace({_id:id},data,{new:true});
//         res.status(200).send({
//             message: "Promotion replaced successfully",
//             data: result
//         });
//     }catch(err){
//         res.status(500).send({
//             message : err
//         });
//     }
// };

exports.updatePromotion = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
        const result = await PromotionCollection.findByIdAndUpdate(id,data,{new:true});
        res.status(200).send({
            message: "Promotion updated successfully",
            data: result
        });
    } catch(err){
        res.status(500).send({
            message : err
        });
    }
};

exports.deletePromotion = async (req, res) => {
    const id = req.params.id;
    try{
        const result = await PromotionCollection.findByIdAndDelete(id);
        res.status(200).send({
            message: "Promotion deleted successfully",
            data: result
        });
    }
    catch(err){
        res.status(500).send({
            message : err
        });
    }
};
