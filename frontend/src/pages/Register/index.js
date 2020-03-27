import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { ONGS } from "../../constants/url";

// 52dec7f2, 8e6e01d4

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  // History serve para fazer navegação javascript quando o cliente
  // nao pode navegar via RouterDOM
  const history = useHistory();

  async function handleRegister(e) {
    // Previne que o evento de onSubmite do formulário não cause uma atualização na pagina.
    e.preventDefault();
    const data = { name, email, whatsapp, city, uf };

    try {
      const response = await api.post(ONGS, data);

      // O campo de dados de retorno do axios é o data.
      alert(`Seu ID de acess: ${response.data.id}`);

      history.push("/");
    } catch (e) {
      alert("Erro ao Cadastrar a ONG");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para o Logon
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            // No onChange, ele chama um evento de mudança de estado, e nessa mudança, o valor do campo é inserido dentro do e.target.value.
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome da ONG"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail"
          />
          <input
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            placeholder="WhatsApp"
          />
          <div className="input-group">
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Cidade"
            />
            <input
              value={uf}
              onChange={e => setUf(e.target.value)}
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
