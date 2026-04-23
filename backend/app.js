const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const productRouter = require("./routes/products");
const adminRouter = require("./routes/auth");
const orderToTelegramRouter = require("./routes/orderToTelegram");
const cronJobRouter = require("./routes/cron-job");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger(formatsLogger));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/product", productRouter);
app.use("/api/auth", adminRouter);
app.use("/api/orders", orderToTelegramRouter);
app.use("/api", cronJobRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
