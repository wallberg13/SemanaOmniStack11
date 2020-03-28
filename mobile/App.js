import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";

import Routes from "./src/routes";

// Elementos HTML <div> <span> <header> <footer>
// As coisas não tem significado -> Todo Text é Text
// Tudo no ReactNative é display: flex
// As propriedades é estilo Camel case
// Não existe herança em estilização de componente.
// Toda customização é propria.

export default function App() {
  return <Routes />;
}
