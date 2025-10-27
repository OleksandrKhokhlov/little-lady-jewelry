const Product = require("../models/product");
const cloudinary = require("../helpers/cloudinary");

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Product.find({})
      .sort({ quantity: -1 })
      .skip(skip)
      .limit(parseInt(limit));
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
    const { productType } = req.query;
    const product = await Product.find({ type: productType });
    if (!product) {
      next();
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const {
    name,
    images = [],
    video,
    price,
    type,
    material,
    insert,
    weight,
    dimensions,
    quantity,
  } = req.body;

  try {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const result = await Promise.all(
      images.map((image) =>
        cloudinary.uploader.upload(image, {
          folder: "little-lady-jewelry",
          width: 300,
          crop: "scale",
        })
      )
    );

    const uploadedImages = result.map((res) => ({
      public_id: res.public_id,
      url: res.secure_url,
    }));

    const newProduct = await Product.create({
      name,
      images: uploadedImages,
      video,
      price,
      type,
      material,
      insert,
      weight,
      dimensions,
      quantity,
    });
    res.status(201).json(newProduct);
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

const updatePrice = async (req, res, next) => {
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
  updatePrice,
};
