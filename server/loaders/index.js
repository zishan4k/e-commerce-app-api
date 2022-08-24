const expressLoader = require("./express");
const passportLoader = require("./passport");
const routeLoader = require("../routes");
const swaggerLoader = require("./swagger");
const swagger = require("./swagger");

module.exports = async (app) => {
  //Load Express Middleware
  const expressApp = await expressLoader(app);

  //Load Passport Middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);

  // Load Swagger
  await swaggerLoader(app);

  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status).send({ message });
  });
};
