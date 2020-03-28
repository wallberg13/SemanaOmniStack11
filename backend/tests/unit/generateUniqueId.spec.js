const generateUniqueId = require("../../src/utils/generateUniqueId");

/**
 * Escreve-se a categoria do teste + funcao de execução.
 *
 * Testes são escritos de forma de frases em Inglês.
 * Tipo: isto deve gerar um ID unico.
 */
describe("Generate Unique ID", () => {
  it("should generate an unique ID", () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});
