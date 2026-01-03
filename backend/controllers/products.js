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
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.images && product.images.length > 0) {
      const publicIds = product.images.map((img) => img.public_id);
      await Promise.all(publicIds.map((id) => cloudinary.uploader.destroy(id)));
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { images, ...otherUpdates } = req.body;

    const oldProduct = await Product.findById(productId);
    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (Array.isArray(images) && images.length > 0) {
      const oldPublicIds = oldProduct.images?.map((img) => img.public_id || []);

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

      const updateData = {
        ...otherUpdates,
        images: uploadedImages,
      };

      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        {
          new: true,
        }
      );

      if (oldPublicIds.length > 0) {
        await Promise.all(
          oldPublicIds.map((id) => cloudinary.uploader.destroy(id))
        );
      }
      return res.status(200).json(updateProduct);
    }

    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      otherUpdates,
      {
        new: true,
      }
    );

    return res.status(200).json(updateProduct);
  } catch (error) {
    console.log("Error updating product:", error);
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough product in stock" });
    }
    product.quantity -= quantity;
    await product.save();

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
