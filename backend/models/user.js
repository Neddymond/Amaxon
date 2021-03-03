const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false, required: true },
  tokens: [{ token: { type: String, required: true } }]
}, {
  timestamps: true
});

// Filter out sensitive data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Generate user auth token
userSchema.methods.GenerateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id.toString() }, 
    process.env.JWT_SECRET_KEY, 
    { expiresIn: "30d" }
  );
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

// Find a user with the provided details
userSchema.statics.FindByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Unable to login");

  const matched = bcrypt.compare(password, user.password);
  if (!matched) throw new Error("Unable to login");

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;