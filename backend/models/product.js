const { Schema, model } = require("mongoose");
const { handleMongooseErr } = require("../helpers");

const productShema = new Schema(
  {
    image: [String],

    video: String,

    price: Number,

    type: {
      type: String,
      enum: [
        "пусети на заглушках",
        "пусети на закрутках",
        "англійський замок",
        "конго",
      ],
    },

    material: String,

    insert: String,

    weight: Number,

    dimensions: {
      height: Number,
      width: Number,
    },

    quantity: Number,
  },
  { versionKey: false }
);

productShema.post("save", handleMongooseErr);

const Product = model("product", productShema);

module.exports = Product;
