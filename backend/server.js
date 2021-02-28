require("./db/mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const data = require("./data");
const userRouter = require("./routers/userRouter");

app.use(express.json());
app.use(userRouter);

// Return products data
app.get("/api/products", (req, res) => res.send(data.products));

// Return individual product information
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((product) => product._id === Number(req.params.id));
  if(!product) return res.status(404).send({ message: "Product not found" });
  res.send(product);
});

app.get("/", (req, res) => res.send("Server is ready"));

app.listen(port, () => console.log(`Listening to server at port: ${port}`));