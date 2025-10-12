const orderCollection = require("../models/order.model");
const customerCollection = require("../models/customer.model");
const productCollection = require("../models/product.models");

exports.placeOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      deliveryAddress,
      deliveryDate,
      deliveryTime,
      specialInstructions,
    } = req.body;

    console.log("Received order data:", req.body);

    // Validate required fields
    if (!customer || !customer.email || !customer.name || !customer.phone) {
      return res
        .status(400)
        .json({
          message: "Customer details (name, email, phone) are required",
        });
    }

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must contain at least one item" });
    }

    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    let existingCustomer = await customerCollection.findOne({
      Email: customer.email,
    });

    if (!existingCustomer) {
      const customerData = {
        Customer_Name: customer.name,
        Email: customer.email, 
        Contact_Number: customer.phone, 
        Address: deliveryAddress,
      };

      console.log("Creating new customer with data:", customerData);

      const newCustomer = new customerCollection(customerData);
      existingCustomer = await newCustomer.save();
      console.log("Created new customer:", existingCustomer._id);
    } else {
      existingCustomer.Customer_Name = customer.name;
      existingCustomer.Contact_Number = customer.phone;
      existingCustomer.Address = deliveryAddress;
      await existingCustomer.save();
      console.log("Updated existing customer:", existingCustomer._id);
    }

    const detailedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await productCollection.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product with ID ${item.productId} not found`,
        });
      }

      const detailedItem = {
        productId: product._id,
        name: product.Product_Name,
        price: product.Price,
        quantity: item.quantity,
        messageOnCake: item.messageOnCake || "",
      };

      detailedItems.push(detailedItem);
      subtotal += product.Price * item.quantity;
    }

    const deliveryFee = 250;
    const totalAmount = subtotal + deliveryFee;
    
    const order = new orderCollection({
      customerId: existingCustomer._id,
      items: detailedItems,
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress,
      deliveryDate: deliveryDate || "",
      deliveryTime: deliveryTime || "",
      specialInstructions: specialInstructions || "",
      status: "Pending",
    });

    await order.save();
    console.log("Order created successfully:", order._id);

    res.status(201).json({
      message: "Order placed successfully",
      order: order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      message: "Error placing order",
      error: error.message,
    });
  }
};

exports.viewAllOrders = async (req, res) => {
  try {
    const orders = await orderCollection
      .find()
      .populate("customerId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

exports.viewByOrderId = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderCollection
      .findById(orderId)
      .populate("customerId")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({
      message: "Error retrieving order",
      error: error.message,
    });
  }
};

exports.viewByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const orders = await orderCollection
      .find({ customerId })
      .populate("customerId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this customer",
      });
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

exports.viewByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const orders = await orderCollection
      .find({ "items.productId": productId })
      .populate("customerId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this product",
      });
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

exports.viewByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const validStatuses = ["Pending", "Processing", "Completed", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const orders = await orderCollection
      .find({ status })
      .populate("customerId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this status",
      });
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Completed", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const order = await orderCollection
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .populate("customerId")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderCollection.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      deletedOrder: order,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      message: "Error deleting order",
      error: error.message,
    });
  }
};
