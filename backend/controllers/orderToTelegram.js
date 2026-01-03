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

    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      let bodyText;
      try {
        bodyText = await response.text();
      } catch (err) {
        bodyText = "<unable to read response body>";
      }
      console.error("Telegram API error", {
        status: response.status,
        body: bodyText,
      });
      return res.status(500).json({
        message: "Failed to send order to Telegram",
        details: bodyText,
      });
    }

    return res
      .status(200)
      .json({ message: "Order sent to Telegram successfully" });
  } catch (error) {
    console.error("Помилка при надсиланні замовлення:", error);
    return res
      .status(500)
      .json({ message: "Failed to send order to Telegram" });
  }
};

module.exports = { sendOrderToTelegram };
