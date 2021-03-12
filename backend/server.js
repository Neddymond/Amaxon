require("./db/mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => res.send("Server is ready"));

app.listen(port, () => console.log(`Listening to server at port: ${port}`));