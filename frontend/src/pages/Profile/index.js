import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";
import { PROFILE, INCIDENTS } from "../../constants/url";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  const history = useHistory();

  /**
   * Função que serve para disparar uma função, em um determinado momento
   * do componente.
   *
   * Dois parametros, uma função a ser executada e o momento que ela deve ser executada.
   * O momento é representado por um array, que diz respeito que quando tal elemento é atualizado,
   * o mesmo também é.
   */

  useEffect(() => {
    if (ongId) {
      api
        .get(PROFILE, {
          headers: {
            Authorization: ongId
          }
        })
        .then(response => {
          setIncidents(response.data);
        });
    } else {
      history.push("/");
    }
  }, [ongId, history]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`${INCIDENTS}/${id}`, {
        headers: { Authorization: ongId }
      });

      // Renderizando novamente os incidents.
      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch (e) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear(); // Limpando todo o local Story.
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={19} color="#e02041"></FiPower>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incidents => (
          // O Key é essencial na hora de fazer CRUD na Interface.
          <li key={incidents.id}>
            <strong>CASO:</strong>
            <p>{incidents.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incidents.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incidents.value)}
            </p>

            {/* o onClick, para ser executada em sua total performace, precisa de uma função como retorno para executar,
            e executar a função que a mesma chama, isso pq, se for a chamda de uma função, a função será executada de imediato. */}
            <button
              onClick={() => handleDeleteIncident(incidents.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
