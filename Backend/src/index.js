const express = require("express");
const routes = require("./routes");

const app = express();

// Isso é um Middleware
app.use(express.json());
app.use(routes);

app.listen(3333);
