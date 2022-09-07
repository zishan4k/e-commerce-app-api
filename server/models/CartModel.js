const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
    // this.converted = data.converted || null;
    // this.isActive = data.isActive || true;
  }

  async create(user_id) {
    console.log('CartModel create method');
    console.log(user_id);
    console.log(this);
    try {
      console.log(this);
      const data = { user_id, ...this };
      console.log(data);
      const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
      console.log(statement);
      const result = await db.query(statement);
      console.log(result);
      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findByUser(userId) {
    try {
      const statement = `SELECT * FROM carts WHERE user_id = $1`;
      const values = [userId];

      console.log('searching for result in cartmodel');
      console.log(statement);
      console.log(values);
      const result = await db.query(statement, values);
      console.log('found result in cartmodel');

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findById(id) {
    try {
      const statement = `SELECT * FROM carts WHERE id = $1`;
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
};
