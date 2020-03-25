const knex2 = require("knex");

/**
 * Método UP é sempre responsável pela criação da tabela
 * @param {knex2} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("ongs", function(table) {
    // Não me toquei que era string, kkk. Enfim, vai ser criado uma chave unica no codigo
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
};

/**
 * Método DOWN é sempre responsável por desfazer a merda
 * @param {knex2} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable("ongs");
};
