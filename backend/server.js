const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/database");
const { rateLimiter } = require("./utils/rateLimiter")

require("dotenv").config();
connectDB();

const app = express();

rateLimiter(app);

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// const data = require("./data");
// const Product = require("./models/ProductModel");
// 
// app.use("/api/products/seed", async (req, res) => {
//   try {
//     const products = await Product.insertMany(data.products);
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// });
