const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const auth = require("../Auth/auth");

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

    console.log(order)

    await order.save();

    res.status(201).send({ message: "New Order Created", order});
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;