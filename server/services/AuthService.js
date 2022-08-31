const createError = require('http-errors');
const UsersModel = require('../models/UsersModel');

const UsersModelInstance = new UsersModel();

module.exports = class AuthService {
  // User registration
  async register(data) {
    const { email, password } = data;

    try {
      // Check if user already exists
      const user = await UsersModelInstance.findByEmail(email);

      if (user) {
        throw createError(409, 'Email already in use.');
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
        throw createError(401, 'Incorrect username or password.');
      }

      if (user.password !== password) {
        throw createError(401, 'Incorrect username or password.');
      }

      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  //Google login
  async googleLogin(profile) {
    const { id, displayName } = profile;

    try {
      //check user exists
      const user = await UsersModelInstance.findByGoogleId(id);

      //if user doesnt exists, create new user
      if (!user) {
        return await UsersModelInstance.create({ google: { id, displayName } });
      }

      //if user exists, return user
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }

  //facebook login
  async facebookLogin(profile) {
    const { id, displayName } = profile;

    try {
      //check if user exists
      const user = await UsersModelInstance.findByFacebookId(id);

      //if user doesnt exists, create new user
      if (!user) {
        return await UsersModelInstance.create({
          facebook: { id, displayName },
        });
      }

      //if user exists, return user
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
};
