const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
  }

  async create(user_id) {
    try {
      const data = { user_id, ...this };
      const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
      const result = await db.query(statement);
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

      const result = await db.query(statement, values);

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
