const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const data = require("../data");

// Endpoint for fetching all products
router.get("/", async (req, res) => {
  try {
    // const products = await Product.find({});
    const products = await Product.insertMany(data.products);

    const newProducts =  await products.save();

    if (!newProducts) {
      return res.status(400).send();
    }

    res.send(newProducts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint for storing products into the db.
router.get("/seed", async (req, res) => {
  try {
    const products = await Product.insertMany(data.products);
    res.send(products)
  } catch (e) {
    res.status(400).send(e);
  }
});

// Endpoint for fetching a product detail
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;