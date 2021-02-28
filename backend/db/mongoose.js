const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/amaxon", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});