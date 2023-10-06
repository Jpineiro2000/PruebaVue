//exportar función a componente
//Esto es una función pura, recibe dos parámetros, no modifica ninguna propiedad y devuelve un resultado


//reviews?api_key=66ae687f31e3066ab23a1b7128278d17&language=en-US&page=1
import {url, api_key} from "./CommonData.js";

function getReviewFilm(filmId){
    const urlId = new URL(filmId+"/reviews",url);
    urlId.searchParams.set('api_key',api_key);
    urlId.searchParams.set("language", 'en-US');
    return urlId.toString();
}

export default getReviewFilm;

