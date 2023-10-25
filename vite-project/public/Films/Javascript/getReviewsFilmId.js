//exportar función a componenteqqqqq
//Esto es una función pura, recibe dos parámetros, no modifica ninguna propiedad y devuelve un resultado

import { url, api_key } from "./CommonData.js";

function getReviewFilm(filmId) {
  const urlId = new URL(filmId + "/reviews", url);
  urlId.searchParams.set("api_key", api_key);
  urlId.searchParams.set("language", "en-US");
  return urlId.toString();
}

export default getReviewFilm;
