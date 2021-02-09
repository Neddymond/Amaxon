const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const data = require("./data");

// Return products data
app.get("/api/products", (req, res) => res.send(data.products));

app.get("/", (req, res) => res.send("Server is ready"));

app.listen(port, () => console.log(`Listening to server at port: ${port}`));