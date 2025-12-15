const { getById } = require("../controllers/products");

const totalOrders = async (orderItems) => {
  try {
    const promises = orderItems.map(async ([productId, quantity]) => {
      const { images, name, price } = await getById(productId);
      return { image: images[0]?.url, name, price, quantity };
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
