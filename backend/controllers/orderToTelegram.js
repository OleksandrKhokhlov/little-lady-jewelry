const { default: axios } = require("axios");
const { totalOrders, updateStockAfterOrder } = require("../helpers");

const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const sendOrderToTelegram = async (req, res, next) => {
  try {
    const orderData = req.body;

    if (!orderData || !orderData.counts) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const orderItems = Object.entries(orderData.counts);
    await updateStockAfterOrder(orderItems);

    const orderDetails = await totalOrders(orderItems);

    const formatOrderDetails = () => {
      return orderDetails
        .map((item, index) => {
          if (item.message) {
            return `${index + 1}. ${item.message}`;
          }

          return `${index + 1}.
        Фото: ${item.image || "немає фото"}
        Назва: ${item.name}
        Ціна: ${item.price} грн
        Кількість: ${item.quantity}`;
        })
        .join("\n\n");
    };

    const orderDetailsText = formatOrderDetails(orderDetails);

    if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram token or chat id is missing", {
        TELEGRAM_BOT_TOKEN,
        CHAT_ID,
      });
      return res
        .status(500)
        .json({ message: "Telegram bot token or chat id not configured" });
    }

    const message = `Нове замовлення:\n
        Ім'я: ${orderData.firstName}\n
        Призвіще: ${orderData.lastName}\n
        Телефон: ${orderData.telephone}\n
        Адреса: ${orderData.town}\n
        Відділення/Індекс: ${orderData.warehouse}\n
        Оплата: ${orderData.payment}\n
        Сума до сплати: ${orderData.totalPrice}\n
        Доставка: ${orderData.delivery}\n
        Коментар: ${orderData.comment}\n
        Товари: ${orderDetailsText}
        Дата замовлення: ${new Date().toLocaleString("uk-UA")}
        `;

    await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: message,
    });
    return res
      .status(200)
      .json({ message: "Order sent to Telegram successfully" });
  } catch (error) {
    if (error.response) {
      console.error("Помилка відповіді від Telegram API:", error.response.data);
    }
    return res
      .status(500)
      .json({ message: "Failed to send order to Telegram" });
  }
};

module.exports = { sendOrderToTelegram };
