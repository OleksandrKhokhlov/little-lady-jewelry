const express = require("express");
const { validateBody, isValidId, isValidType } = require("../middlewares");
const { productSchema, updateQuantitySchema } = require("../schemas/products");

const router = express.Router();

const {
  getAll,
  getByType,
  getById,
  add,
  updateById,
  deleteById,
  updateQuantity,
} = require("../controllers/products");

router.get("/", getAll);
router.get("/:productId", isValidId, getById);
router.get("/:productType", isValidType, getByType);
router.post("/", validateBody(productSchema), add);
router.delete("/:productId", isValidId, deleteById);
router.put("/:productId", isValidId, validateBody(productSchema), updateById);
router.patch(
  "/:productId/quantity",
  isValidId,
  validateBody(updateQuantitySchema),
  updateQuantity
);

module.exports = router;
