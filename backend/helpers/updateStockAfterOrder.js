const Product = require("../models/product");

const updateStockAfterOrder = async (orderItems) => {
  for (const [productId, quantity] of orderItems) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    if (product.quantity < quantity) {
      throw new Error(`Not enough stock for product ID ${productId}`);
    }
    product.quantity -= quantity;
    await product.save();
  }
};

module.exports = { updateStockAfterOrder };
 