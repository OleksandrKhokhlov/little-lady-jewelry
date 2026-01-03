const handleMongooseErr = require("./handleMongooseErr");
const HttpError = require("./HttpError");
const totalOrders = require("./totalOrder");
const { updateStockAfterOrder } = require("./updateStockAfterOrder");

module.exports = {
  handleMongooseErr,
  HttpError,
  totalOrders,
  updateStockAfterOrder,
};
