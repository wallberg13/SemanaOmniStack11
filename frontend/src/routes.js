import React from "react";

// BrowserRouter -> Gerenciador de Rotas (o componente que deve está ao redor das rotas)
// Route -> a Propria Rota
// Switch -> O cara que garante que só uma rota será executada por vez
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";

export default function Routes() {
  return (
    /**
     * BrowserRouter, não verifica se a rota é exatamente, ele vai pegando as subrotas
     * e jogando em cima.
     */
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/incidents/new" exact component={NewIncident} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
