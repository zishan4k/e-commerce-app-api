const express = require("express");
const loaders = require("./src/loaders");

const app = express();
const port = 3000;

async function startServer() {
  // Init application loaders
  loaders(app);

  // Start server
  app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
  });
}

startServer();
