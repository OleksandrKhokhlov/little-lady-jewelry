const express = require("express");
const { validateBody } = require("../middlewares");
const { orderedSchema } = require("../schemas/products");
const { sendOrderToTelegram } = require("../controllers/orderToTelegram");

const router = express.Router();

router.post("/", validateBody(orderedSchema), sendOrderToTelegram);

module.exports = router;
