const connection = require("../database/connection");

module.exports = {
  /**
   * Rota para listagem dos incidents.
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const { page = 1 } = req.query;

    // Contando quantos registros possui dentro da tabela
    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id") // Fazendo um Join entre duas Tabelas
      .limit(5) // Limite de Registros
      .offset((page - 1) * 5) // Offset de Registro
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    // Enviando pelo cabeçalho da resposta, dizendo quantos registros
    // possui no app
    res.header("X-Total-Count", count["count(*)"]);
    return res.json(incidents);
  },

  /**
   * Rota para criar um incident.
   * @param {*} req
   * @param {*} res
   */
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    /**
     * O insert no KNEX, só retorna um ID que foi add no banco.
     */
    const result = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    const id = result[0];

    return res.json({ id });
  },

  /**
   * Rota de delete dos incidents. Só pode ser deletado os incidents criados
   * pela a propria ONG.
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first(); // Apenas o primeiro resultado.

    if (incident === undefined) {
      return res.status(404).json({ error: "Not Found Data" });
    }

    if (incident.ong_id !== ong_id) {
      // Retorna um não autorizado.
      return res.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    /**
     * 204 -> Resposta com sucesso mas sem conteúdo.
     */
    return res.status(204).send();
  }
};
