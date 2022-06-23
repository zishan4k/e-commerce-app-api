const expressLoader = require("./express");

module.exports = async (app) => {
  const expressApp = await expressLoader(app);

  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).send({ message });
  });
};
