const createError = require("http-errors");
const UsersModel = require("../models/users");

const UsersModelInstance = new UsersModel();

module.exports = class AuthService {
  // User registration
  async register(data) {
    const { email } = data;

    try {
      // Check if user already exists
      const user = await UsersModelInstance.findByEmail(email);

      if (user) {
        throw createError(409, "Email already in use.");
      }

      return await UsersModelInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }

  // User login
  async login(data) {
    const { email, password } = data;

    try {
      // Check if user exists
      const user = await UsersModelInstance.findByEmail(email);

      if (!user) {
        throw createError(401, "Incorrect username or password.");
      }

      if (user.password !== password) {
        throw createError(401, "Incorrect username or password.");
      }

      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
