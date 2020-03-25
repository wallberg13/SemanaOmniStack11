const express = require("express");

const routes = express.Router();

routes.post("/users", (req, res) => {
  const params = req.body;

  console.log(params);

  return res.json({
    evento: "Semana OmniStack 11.0",
    aluno: "Wall Berg Morais"
  });
});

module.exports = routes;
