const express = require("express");

const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Welcome to our E-Commerce App.");
});

server.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
