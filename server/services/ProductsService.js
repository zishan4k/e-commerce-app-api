const createError = require("http-errors");
const ProductsModel = require("../models/ProductsModel");

const ProductsModelInstances = new ProductsModel();

module.exports = class ProductsService {
  //Get a list of Products
  async list(options) {
    try {
      const products = await ProductsModelInstances.find(options);

      return products;
    } catch (err) {
      throw err;
    }
  }

  // Get Products by id
  async get(id) {
    try {
      const product = await ProductsModelInstances.findById(id);

      if (!product) {
        throw createError(404, "Product not found.");
      }

      return product;
    } catch (err) {
      throw err;
    }
  }
};
