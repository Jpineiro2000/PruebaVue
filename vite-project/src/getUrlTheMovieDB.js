//exportar función a componente
//Esto es una función pura, recibe dos parámetros, no modifica ninguna propiedad y devuelve un resultado

const baseAPIUrl = "https://api.themoviedb.org/3/";
const api_key = "66ae687f31e3066ab23a1b7128278d17";

function getUrlTheMovieDB(query, page) {
  let isQueryValid = typeof query == "string";
  let isPageValid = Number.isInteger(page);
  if (!isQueryValid || !isPageValid) {
    throw new Error("Formato cadena o página inválidos");
  }
  let url = new URL(baseAPIUrl);

  if (query.trim() !== "") {
    url.pathname += "search/movie";
    url.searchParams.set("query", query);
  } else {
    url.pathname += "discover/movie";
  }

  url.searchParams.set("api_key", api_key);
  url.searchParams.set("page", page);
  return url.toString();
}

export default getUrlTheMovieDB;
