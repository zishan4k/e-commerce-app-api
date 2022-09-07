const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {
  // Create new cart item
  static async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, 'cart_items') + 'RETURNING *';
      const results = await db.query(statement);
      // console.log(result);
      const result = results.rows[0];
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Update existing cart item
  static async update(id, data) {
    try {
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
      const statement = pgp.helpers.update(data, null, 'cartItem') + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Get cart item from cart
  static async find(cartId) {
    try {
      const statement = `SELECT ci.quantity, ci.id AS cartItemId, p.* FROM cartItem ci INNER JOIN products p ON p.id = ci.productId WHERE cartId = $1`;
      const values = [cartId];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error(err);
    }
  }

  //Delete item from cart
  static async delete(id) {
    try {
      const statement = `DELETE FROM cartItem WHERE id = $1 RETURNING *`;
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
