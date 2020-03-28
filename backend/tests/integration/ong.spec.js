const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
/**
 * O request, ele meio que "inicializa um servidor" para aplicação. Fazendo com que a mesma possa está UP e até testada. hehehe
 * Com ele, é possível fazer requisição HTTP para o nosso proprio servidor, sem precisar que ele seja inicializado.
 */

/**
 * OBS sobre o banco de dados:
 * -> Com foi criado um novo banco sqlite para poder ser o banco de testes, então é necessário criar as migrações em cima deles, para que o mesmo possa
 *    ser criado.
 */

describe("ONG", () => {
  // Antes de cada execução
  beforeEach(async () => {
    // Zerando o banco de dados para o Teste.
    await connection.migrate.rollback();
    // Executando todas as migrations
    await connection.migrate.latest();
  });

  /**
   * Depois que todos os testes forem realizados,
   * então a conexão com o banco é desfeita
   */
  afterAll(async () => {
    await connection.destroy(); // Desfazendo a conexão do teste com o banco de dados.
  });

  it("Should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      // .set("Authorization", "ongId") --> Criando um Header na request.
      .send({
        name: "Be a Hero",
        email: "behero@hero.com",
        whatsapp: "+5589989898989",
        city: "Picos",
        uf: "PI"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
