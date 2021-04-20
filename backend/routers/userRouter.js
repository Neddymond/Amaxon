const express = require("express");
const router = express.Router();
const User = require("../models/user");
const data = require("../data");
const auth = require("../Auth/auth");
const bcrypt = require("bcrypt");

/** Endpoint for creating an account */
router.post("/register", async (req, res) => {
  try {
    const user = await new User(req.body);

    if (!user) {
      res.status(400).send();
    }

    const token = await user.GenerateAuthToken();

    res.send({ user, token });
    console.log(user, token)
  } catch (e) {
    res.status(500).send(e);
  }
});

/** Endpoint for inserting users into the db */
router.get("/seed", async (req, res) => {
  try {
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

/** Get user details */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);

  } catch (e) {
    res.status(500).send({ message: e });
  }
});

router.put("/profile", auth, async (req, res) => {
  const user = req.user;

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = bcrypt.hashSync(req.body.password, 8);
  }

  const token = await user.GenerateAuthToken();

  const updatedUser = await user.save();

  res.send({
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    },
    token
  })
});

module.exports = router;