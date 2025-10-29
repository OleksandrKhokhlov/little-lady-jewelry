const express = require("express");
const { validateBody, isValidId, isValidType, authAdmin } = require("../middlewares");
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
router.post("/", authAdmin, validateBody(productSchema), add);
router.delete("/:productId", authAdmin, isValidId, deleteById);
router.patch("/:productId", authAdmin, isValidId, validateBody(productSchema), updateById);
router.patch(
  "/:productId/quantity", authAdmin,
  isValidId,
  validateBody(updateQuantitySchema),
  updateQuantity
);
router.patch(
  "/:productId/price", authAdmin,
  isValidId,
  validateBody(updatePriceSchema),
  updatePrice
);

module.exports = router;
