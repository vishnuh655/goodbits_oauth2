const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const routes = require("./routes");
const responseHelper = require("./helpers/response.helper");
const serverConfig = require("./configs/server.config");

const app = express();

app.use(express.json());
app.use(cors());
app.use(responseHelper.helper());
app.use("/api", routes);

(function (server) {
  try {
    server.listen(serverConfig.port, () => {
      console.log(`Server is running on port ${serverConfig.port}`);
    });
  } catch (e) {
    console.error(e);
  }
})(app);

module.exports = app;
