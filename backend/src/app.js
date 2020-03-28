const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errors } = require("celebrate");
const app = express();

// Isso é um Middleware
/**
 * No cors, é possível colocar o origin, que ele vai
 * restringir quem consome o backend.
 */
app.use(cors());
app.use(express.json());
app.use(routes);
// O errors é um middleware de Finalização
app.use(errors());

module.exports = app;
