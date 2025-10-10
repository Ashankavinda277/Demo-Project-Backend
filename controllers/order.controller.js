 const orderCollection = require('../models/order.model');
const customerCollection = require('../models/customer.model');
const productCollection = require('../models/product.models');

exports.placeOrder = async (req, res) => {
    try {
       const {customer,items}=req.body;

       let existingCustomer=await customerCollection.findOne({email:customer.email});
         if(!existingCustomer){
            const newCustomer = new customerCollection(customer);
            existingCustomer=await newCustomer.save();
         }

         const detailedItems = [];
         let total =0;

            for(const item of items){
               const product = await productCollection.findById(item.productId);
               if(product){
                   const detailedItem = {
                       productId: product._id,
                       name: product.name,
                       price: product.price,
                       quantity: item.quantity,
                       messageOnCake: item.messageOnCake
                   };
                   detailedItems.push(detailedItem);
                   total += product.price * item.quantity;
               }
            }

         const order = new orderCollection({
             customerId: existingCustomer._id,
             items: detailedItems,
             totalAmount: total,
             deliveryAddress: req.body.deliveryAddress
         });

         await order.save();
         res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
};

exports.viewAllOrders = async (req, res) => {
    try {
        const orders = await orderCollection.find().populate('customerId').populate('items.productId');
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    }catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

exports.viewByOrderId = async (req, res) => {
    try{
    const orderId = req.params.id;
    const order = await orderCollection.findById(orderId).populate('customerId').populate('items.productId');
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order retrieved successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving order", error });
    }
};

exports.viewByCustomerId = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const orders = await orderCollection.find({ customerId }).populate('customerId').populate('items.productId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this customer" });
        }
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

exports.viewByProductId = async (req, res) => {
    try {
        const productId = req.params.productId;
        const orders = await orderCollection.find({ 'items.productId': productId }).populate('customerId').populate('items.productId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this product" });
        }
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

exports.viewByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const orders = await orderCollection.find({ status }).populate('customerId').populate('items.productId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this status" });
        }
        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const validStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
      
        const order = await orderCollection.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderCollection.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
};
