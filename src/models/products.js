const db = require("../db");

module.exports = class ProductsModel {
  // List products
  async find(options = {}) {
    try {
      const statement = `SELECT * FROM products`;
      const values = [];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw err;
    }
  }

  // Find Products By ID
  async findById(id) {
    try {
      const statement = `SELECT * FROM products WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
};
