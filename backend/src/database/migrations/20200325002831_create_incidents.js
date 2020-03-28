const knex2 = require("knex");

/**
 * Método UP é sempre responsável pela criação da tabela
 * @param {knex2} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("incidents", function(table) {
    table.increments(); // Chave primaria que auto incrementa
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();

    /**
     * Foreign Keys
     */
    table.string("ong_id").notNullable();

    /**
     * Constraints
     */
    table
      .foreign("ong_id") // Campo desta tabela, que é chave estrangeira
      .references("id") // Qual campo na tabela destino essa chave refencia
      .inTable("ongs"); //
  });
};

/**
 * Método DOWN é sempre responsável por desfazer a merda
 * @param {knex2} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable("incidents");
};
