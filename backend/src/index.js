const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Isso é um Middleware
/**
 * No cors, é possível colocar o origin, que ele vai
 * restringir quem consome o backend.
 */
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
