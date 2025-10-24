const { Schema, model } = require("mongoose");
const { handlerMongooseErr } = require("../helpers");

const productSchema = new Schema(
  {
    name: String,

    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

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

productSchema.post("save", handlerMongooseErr);

const Product = model("product", productSchema);

module.exports = Product;
