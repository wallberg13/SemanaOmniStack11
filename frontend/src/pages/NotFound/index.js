import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import logo from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <section>
        <img src={logo} alt="Be The Hero" />

        <div className="notfound-text">
          <h1>Not Found Page</h1>
          <Link className="button" to="/">
            Voltar para Inicio
          </Link>
        </div>

        <img className="img-limit" src={heroesImg} alt="Heroes" />
      </section>
    </div>
  );
}
