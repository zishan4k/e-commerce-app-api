const createError = require('http-errors');
const UsersModel = require('../models/UsersModel');

const UsersModelInstance = new UsersModel();

module.exports = class AuthService {
  // User registration
  async register(data) {
    console.log('AuthService entered');
    console.log('AuthService data destructured');

    const { email } = data;
    console.log(email);
    try {
      // Check if user already exists
      console.log('checking for user');
      const user = await UsersModelInstance.findByEmail(email);
      console.log('done checking for user');
      console.log(user);
      if (user) {
        throw createError(409, 'Email already in use.');
      }
      console.log('creating new user');
      return await UsersModelInstance.create(data);
    } catch (err) {
      console.log('unable to create new user');
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
