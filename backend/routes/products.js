const express = require("express");
const { validateBody, isValidId, isValidType } = require("../middlewares");
const {
  productSchema,
  updateQuantitySchema,
  updatePriceSchema,
} = require("../schemas/products");

const router = express.Router();

const {
  getAll,
  getByType,
  getById,
  add,
  updateById,
  deleteById,
  updateQuantity,
  updatePrice,
} = require("../controllers/products");

router.get("/", getAll);
router.get("/type", isValidType, getByType);
router.get("/:productId", isValidId, getById);
router.post("/", validateBody(productSchema), add);
router.delete("/:productId", isValidId, deleteById);
router.put("/:productId", isValidId, validateBody(productSchema), updateById);
router.patch(
  "/:productId/quantity",
  isValidId,
  validateBody(updateQuantitySchema),
  updateQuantity
);
router.patch(
  "/:productId/price",
  isValidId,
  validateBody(updatePriceSchema),
  updatePrice
);

module.exports = router;
