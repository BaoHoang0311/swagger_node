const express = require("express");
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const OpenApiValidator = require("express-openapi-validator");

//================= init Express
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

//#region Swagger
const swaggerdoc = JSON.parse(fs.readFileSync("./src/swagger.json", "utf8"));
app.use("/swagger/index.html", swaggerUi.serve, swaggerUi.setup(swaggerdoc));

// http://localhost:3056/v1/swagger.json (xuất file json)
app.get("/v1/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerdoc);
});
//#endregion

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerdoc,
    validateRequests: true, // <-- rejects missing required fields
  })
);

//#region Required property(login) 
app.use((err, req, res, next) => {
  if (err.status && err.errors) {
    return res.status(err.status).json({
      message: "Request validation failed",
      errors: err.errors.map((e) => ({
        path: e.instancePath || e.path,
        message: e.message,
        location: e.location, // e.g., "body", "query", etc.
        schemaPath: e.schemaPath,
      })),
    });
  }
  // fallback for unexpected errors
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});
//#endregion

//================== init router
app.use("/", require("./router/index"));

module.exports = app;

// xài nodemon
// npm install -g nodemon
// gõ "npx nodemon server.js"
