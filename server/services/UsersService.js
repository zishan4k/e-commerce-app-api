const createError = require("http-errors");
const UsersModel = require("../models/UsersModel");

const UsersModelInstance = new UsersModel();

module.exports = class UsersService {
  async get(data) {
    const { id } = data;
    try {
      const user = await UsersModelInstance.findById(id);

      if (!user) {
        throw createError(404, "User not found.");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const user = await UsersModelInstance.update(data);
      return user;
    } catch (err) {
      throw err;
    }
  }
};
