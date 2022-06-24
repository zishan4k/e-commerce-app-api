const express = require("express");
const ProductsService = require("../services/products");

const router = express.Router();
const ProductsServiceInstance = new ProductsService();

module.exports = (app) => {
  app.use("/products", router);

  router.get("/", async (req, res, next) => {
    try {
      const query = req.query;
      const response = await ProductsServiceInstance.list(query);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;
      const response = await ProductsServiceInstance.get(productId);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
