const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const productRouter = require("./routes/products");
const adminRouter = require("./routes/auth");
const orderToTelegramRouter = require("./routes/orderToTelegram");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger(formatsLogger));
app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/auth", adminRouter);
app.use("/api/orders", orderToTelegramRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
