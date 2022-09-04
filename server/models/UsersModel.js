const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UsersModel {
  //Create User
  async create(data) {
    try {
      // Generate SQL statement - helper used for dynamic param injection
      console.log('generating statement');
      const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
      // error is being caused because users table id column (primary key) is setup as integer type
      // and will not execute this statement because it is missing an id value... need to remake the
      // tables within the database so that the table have an id column of serial type
      console.log('executing statement');
      console.log(statement);
      const result = await db.query(statement);
      console.log('generating result');

      if (result.rows?.length) {
        return result.rows[0];
      }

      console.log(result);

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  //Update User
  async update(data) {
    try {
      const { id, ...params } = data;

      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(params, null, 'users') + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  //Find User By E-mail
  async findByEmail(email) {
    try {
      const statement = `SELECT * FROM users WHERE email = $1`;
      const values = [email];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  //Find User By ID
  async findById(id) {
    try {
      const statement = `SELECT * FROM users WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  //find user by google id
  async findByGoogleId(id) {
    try {
      //generate sql command
      const statement = `SELECT * FROM users WHERE google = $1`;
      const values = [id];

      //execute sql command
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  //find by facebook id
  async findByFacebookId(id) {
    try {
      //generate sql command
      const statement = `SELECT * FROM users WHERE facebook = $1`;
      const values = [id];

      //execute sql command
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
