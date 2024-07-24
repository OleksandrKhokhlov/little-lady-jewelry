const express = require("express");
const { validateBody } = require("../middlewares");
const { adminSchema } = require("../schemas/admin");
const {
  register,
  login,
  } = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(adminSchema), register);

router.post("/login", validateBody(adminSchema), login);


module.exports = router;
