const express = require("express");
const loaders = require("./loaders");
const { PORT } = require("./config");

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
