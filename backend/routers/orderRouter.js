const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const auth = require("../Auth/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    // console.log(orders);
     
    if (!orders) {
      res.status(404).send({ message: "No order found" });
    }

    res.send({orders});
  } catch (e) {
    res.status(500).send(e);
  }
});

/** Endpoint for saving an order to db */
router.post("/", auth, async (req, res) => {
  try {
    if (req.body.orderItems.length === 0)  {
      return res.status(400).send({ message: "Cart is empty" });
    }

    const order = await new Order({
      ...req.body,
      user: req.user._id
    });

    await order.save();

    res.status(201).send({ message: "New Order Created", order});
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    
    res.send({
      order, 
      name: req.user.name, 
      email: req.user.email 
    });
  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.put("/:id/pay", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    console.log(req.body);
    
    if (!order) {
      return res.status(400).send({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      status: "completed",
      update_time: Date.now(),
      email: req.body.email
    };

    await order.save();

    res.send({message: "Order Paid", order});
  } catch (e) {
    res.status(500).send({ message: e });
  }
})

module.exports = router;