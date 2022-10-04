require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Middleware
app.use(express.json());
// Route Middlewares
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Payment settings
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: req.body.name,
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error ", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
