const express = require("express");
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require('swagger-ui-express');
//================= init Express
const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
const swaggerdoc = JSON.parse(fs.readFileSync("./src/swagger.json", "utf8"));

app.use('/swagger/index.html', swaggerUi.serve,swaggerUi.setup(swaggerdoc));
// http://localhost:3056/v1/swagger.json
app.get('/v1/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerdoc);
});

//================== init router
app.use("/", require("./router/index"));

module.exports = app;

// xài nodemon
// npm install -g nodemon
// gõ "npx nodemon server.js"
