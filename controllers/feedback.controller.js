const feedbackCollection = require('../models/feedback.model');

exports.addFeedback = async (req,res) => {
    try{
        const{ username, email, message} = req.body;
        
        // if(!username || !email || !message){
        //     return res.status(400).json({message: "All username,email, and your comment are required" });

        // }

        const newFeedback = new feedbackCollection({username, email, message});
        await newFeedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully",
            data: newFeedback
        });
    }
    catch(err){
        res.status(500).json({
            message : err
        })
    }
};

exports.showFeedback = async (req,res) => {
    try{
      const feedbacks = await feedbackCollection.find().sort({createdAt: -1});
      res.status(200).json({
        data: feedbacks
      });

    }
    catch(err){
        res.status(500).json({
            message: 'Error retrieving feedbacks', err
            
        })
    }
}

exports.showFeedbackByDate = async (req,res) => {
    try{
        const data = req.params.date;
        const feedbacks = await feedbackCollection.find({createdAt: {$gte: new Date(data)}}).sort({createdAt: -1});
        res.status(200).send({
            message: "Feedbacks received successfully",
            data: feedbacks
        })
    }
    catch(err){
        res.status(500).send({
            message: err
        })
    }
}
