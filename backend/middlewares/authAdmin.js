const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;
const authAdmin = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const admin = await Admin.findById(id);

      if (!admin || !admin.token || admin.token !== token) {
        throw HttpError(401, "Not authorized");
      }
      req.admin = admin;
      next();
    } catch {
      throw HttpError(401, "Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authAdmin;
