const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    // Gerando uma string aleatória
    // Gerando 4 Bytes de caracteres hexadecimal. Já que o ID é criado no RANDOM.
    const id = generateUniqueId();

    // try {
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    // } catch (e) {
    //   return res.status(500).json({
    //     mensagem: "Erro no Banco",
    //     timestamp: Date.now()
    //   });
    // }
    return res.json({ id });
  },

  async index(req, res) {
    const ongs = await connection("ongs").select("*");

    return res.json(ongs);
  }
};
