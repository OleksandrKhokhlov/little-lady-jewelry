const { Schema, model } = require("mongoose");
const { handleMongooseErr } = require("../helpers");

const productShema = new Schema(
  {
    image: String,

    video: String,

    price: Number,

    weight: Number,

    dimensions: {
      height: Number,
      width: Number,
    },
  },
  { versionKey: false }
);

productShema.post("save", handleMongooseErr);

const Product = model("product", productShema);

module.exports = Product;
