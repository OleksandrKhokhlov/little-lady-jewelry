const Product = require("../models/product");

const totalOrders = async (orderItems) => {
  try {
    const promises = orderItems.map(async ([productId, quantity]) => {
      const product = await Product.findById(productId);
      if (!product) {
        return { message: `Не вдалося знайти продукт з ID: ${productId}` };
      }
      const { images, name, price } = product;
      return { image: images?.[0]?.url, name, price, quantity };
    });
    return await Promise.all(promises);
  } catch (error) {
    console.error("Error in totalOrders:", error);
    return orderItems.map(([productId]) => ({
      message: `Не вдалося отримати дані продукту з ID: ${productId}`,
    }));
  }
};

module.exports = totalOrders;
