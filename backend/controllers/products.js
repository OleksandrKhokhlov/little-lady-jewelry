const Product = require("../models/product");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Product.find({}, { skip, limit });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      next();
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getByType = async (req, res, next) => {
  try {
    const { productType } = req.params;
    const product = await Product.find({ type: { productType } });
    if (!product) {
      next();
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const newproduct = await Product.create({ ...req.body });
    res.status(201).json(newproduct);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getByType,
  getById,
  add,
  updateById,
  deleteById,
  updateQuantity,
};
