const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require('../models/admin')
const { HttpError } = require("../helpers");
const { SECRET_KEY, ADMIN_EMAIL } = process.env;


const register = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (email !== ADMIN_EMAIL) {
      throw HttpError(409, "Ви не можете бути адміном");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    await Admin.create({
      ...req.body,
      password: passwordHash,
    });

    res.status(201).json({ admin: { email } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = { id: admin._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await Admin.findByIdAndUpdate(admin._id, { token });

    res.status(200).json({ token, admin: { email } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
