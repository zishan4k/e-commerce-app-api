const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });
const OrderItem = require("./orderItem");

module.exports = class OrderModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.items = data.items || [];
    this.modified = moment.utc().toISOString();
    this.status = data.status || "PENDING";
    this.total = data.total || 0;
    this.userId = data.userId || null;
  }

  addItems(items) {
    this.items = items.map((item) => new OrderItem(item));
  }

  // Creates new order for a user
  async create() {
    try {
      const { items, ...order } = this;
      const statement =
        pgp.helpers.insert(order, null, "orders") + " RETURNING *";

      const result = await db.query(statement);

      if (result.rows?.length) {
        // Add new information generated in the database (ie: id) to the Order instance properties
        Object.assign(this, result.rows[0]);

        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Updates order for a user
  async update(data) {
    try {
      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", {
        id: this.id,
      });
      const statement = pgp.helpers.update(data, null, "orders") + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Gets orders for a user
  static async findByUser(userId) {
    try {
      const statement = `SELECT * FROM orders WHERE userId = $1`;
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

  // Retrieve order by id
  static async findById(orderId) {
    try {
      const statement = `SELECT * FROM orders WHERE id = $1`;
      const values = [orderId];

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
