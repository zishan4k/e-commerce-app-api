const express = require("express");
const UsersService = require("../services/users");

const router = express.Router();
const UsersServiceInstance = new UsersService();

module.exports = (app) => {
  app.use("/users", router);

  router.get("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;

      const response = await UsersServiceInstance.get({ id: userId });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;

      const response = await UsersServiceInstance.update({
        id: userId,
        ...data,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
