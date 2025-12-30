const { productSchema } = require("../models/product");

const handleMongooseErr = (err, data, next) => {
  const { name, code } = err;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  err.status = status;
  next();
};

module.exports = handleMongooseErr;
productSchema.post("save", handleMongooseErr);
