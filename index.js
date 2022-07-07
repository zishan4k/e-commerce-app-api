const express = require("express");
const loaders = require("./src/loaders");
const { PORT } = require("./config");
require("dotenv").config();

console.log(process.env);

const app = express();

async function startServer() {
  // Init application loaders
  loaders(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startServer();
