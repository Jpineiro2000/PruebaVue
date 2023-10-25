//exportar función a componente
//Esto es una función pura, recibe dos parámetros, no modifica ninguna propiedad y devuelve un resultado

import { url, api_key } from "./CommonData.js";

function getFilmDetails(filmId) {
  const urlId = new URL(filmId, url);
  urlId.searchParams.set("api_key", api_key);
  return urlId.toString();
}

export default getFilmDetails;
