const { Client } = require('pg');
const { DB } = require('./config');

(async () => {
  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
      id              SERIAL          PRIMARY KEY NOT NULL,
      first_name      VARCHAR(50),
      last_name       VARCHAR(50),
      email           VARCHAR(100)    NOT NULL,  
      password        TEXT            NOT NULL,
      google          JSON,
      facebook        JSON
    );
  `;

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
      id              SERIAL          PRIMARY KEY NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      price           MONEY           NOT NULL,
      description     VARCHAR(200)    NOT NULL,
      image           TEXT            NOT NULL
    );
  `;

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS orders (
      id              SERIAL          PRIMARY KEY NOT NULL,
      total           MONEY           NOT NULL,
      user_id         INT             NOT NULL,
      created         DATE            NOT NULL,
      modified        DATE            NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS order_items (
      id              SERIAL          PRIMARY KEY NOT NULL,
      name            VARCHAR(50)     NOT NULL,
      description     VARCHAR(200)    NOT NULL,
      quantity        INT             NOT NULL,
      price           MONEY           NOT NULL,
      order_id        INT             NOT NULL,
      product_id      INT             NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `;

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
      id              SERIAL          PRIMARY KEY NOT NULL,
      user_id         INT             NOT NULL,
      modified        DATE            NOT NULL,
      created         DATE            NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  const cartItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id              SERIAL          PRIMARY KEY NOT NULL,
      cart_id         INT             NOT NULL,
      product_id      INT             NOT NULL,
      quantity        INT             NOT NULL,
      FOREIGN KEY (cart_id) REFERENCES carts(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `;

  try {
    const db = new Client({
      user: DB.PGUSER,
      host: DB.PGHOST,
      database: DB.PGDATABASE,
      password: DB.PGPASSWORD,
      port: DB.PGPORT,
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    await db.end();
  } catch (err) {
    console.log('ERROR CREATING ONE OR MORE TABLES: ', err);
  }
})();
