const express = require("express");
const router = express.Router();
const User = require("../models/user");
const data = require("../data");

/** Endpoint for inserting users into the db */
router.get("/seed", async (req, res) => {
  try {
    // Remove all users in the collection
    await User.remove({});

    // Insert users into the db
    const users = await User.insertMany(data.users);
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Endpoint for user sign in
router.post("/signin", async (req, res) => {
  try {
    const user = await User.FindByCredentials(req.body.email, req.body.password);
    const token = await user.GenerateAuthToken();
    res.send({ user, token });
  } catch (e) {
    // console.log(e)
    res.status(401).send(e);
  }
});

module.exports = router;