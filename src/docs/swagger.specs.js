const serverConfig = require("../configs/server.config");
const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OAuth API Service",
      version: "0.1.0",
      description: "This is a simple POC for OAuth2 Using Google OAuth2 API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Vishnu Haridas",
        url: "https://vishnuh.dev",
        email: "vishnuh655@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${serverConfig.port}/api`,
      },
    ],
  },
  apis: ["src/controllers/v1/*.controller.js"],
});
