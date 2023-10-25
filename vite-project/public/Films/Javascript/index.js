import getReviewFilm from "../Javascript/getReviewsFilmId.js";
import getFilmDetails from "../Javascript/getFilmID.js";

const currentUrlWindow = window.location.search;
const urlParams = new URLSearchParams(currentUrlWindow);
const id = urlParams.get("filmid");

try {
  await getUrlDetails(id);
  await getUrlReviewsFilm(id);
} catch (e) {
  myPersonalError("Error", e);
  console.log(e);
}
function hideDetails() {
  document
    .querySelector(".content_noreviews")
    .setAttribute("style", "display: none;");
}
function hideComments() {
  document.querySelector(".comments").setAttribute("style", "display: none;");
}

function showSpinner(number) {
  if (number === ".details") {
    hideDetails();
  } else if (number === ".section_reviews") {
    hideComments();
  }
  document
    .querySelector(number + "> .spinner")
    .setAttribute("style", "display: flex;");
}
function hideSpinner(number) {
  if (number === ".details") {
    showDetails();
  } else if (number === ".section_reviews") {
    showComments();
  }
  document
    .querySelector(number + "> .spinner")
    .setAttribute("style", "display: none;");
  document
    .querySelector(".main")
    .setAttribute("style", "width: 90%;height: auto;");
  document.body.setAttribute(
    "style",
    "width:auto;height: auto;  overflow: auto;",
  );
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "width: auto;height: auto;");
}

function showDetails() {
  document
    .querySelector(".content_noreviews")
    .setAttribute("style", "  display: flex;");
}
function showComments() {
  document.querySelector(".comments").setAttribute("style", "display: flex;");
}

async function getUrlDetails(id) {
  showSpinner(".details");
  const baseUrl = "https://image.tmdb.org/t/p/w300";
  const url = getFilmDetails(id);
  try {
    console.log("Dentro de getURL Details", id);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    //throw ('There is a problem in catching the data from the api');
    const data = await response.json();

    document.querySelector(".cover_img").src = baseUrl + data.poster_path;
    const variableTitle = document.createElement("p");
    const textoTitle = document.createTextNode(data.title);
    variableTitle.appendChild(textoTitle);

    document.title = data.title;
    document.querySelector(".title_film").appendChild(variableTitle);

    const variableOverview = document.createElement("p");
    const textoOverview = document.createTextNode(data.overview);
    variableOverview.appendChild(textoOverview);
    document.querySelector(".description p").appendChild(variableOverview);

    const variableRelease_date = document.createElement("p");
    const textoRelease_date = document.createTextNode(data.release_date);
    variableRelease_date.appendChild(textoRelease_date);
    document.querySelector(".release").appendChild(variableRelease_date);

    /* const variablePopularity = document.createElement("p");
    const textoPopularity = document.createTextNode(data.popularity);
    variablePopularity.appendChild(textoPopularity);
    document.querySelector(".popularity").appendChild(variablePopularity);
*/
    document.querySelector(".popularity p").textContent = data.popularity;

    /* const variableVotes = document.createElement("p");
    const textoVotes = document.createTextNode(data.vote_average);
    variableVotes.appendChild(textoVotes);
    document.querySelector(".votes").appendChild(variableVotes);*/

    document.querySelector(".votes p").textContent = data.vote_average;
    const genres = data.genres;
    console.log("los géneros son : ", genres[0].name);
    for (let i = 0; i < genres.length; i++) {
      let genretiquette = document.createElement("div");
      genretiquette.className = "genretiquette";
      let genre = document.createElement("p");
      let textGenre = document.createTextNode(genres[i].name);
      genre.appendChild(textGenre);
      genretiquette.appendChild(genre);
      document.querySelector(".types").appendChild(genretiquette);
    }
    hideSpinner(".details");
    if (data.title === "" && !error) {
      myPersonalError("Without coincidences", "There is not available data");
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

async function getUrlReviewsFilm(id) {
  showSpinner(".section_reviews");

  let reviews = [];
  const url = getReviewFilm(id);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    //throw ('There is a problem in catching the data from the api');
    const data = await response.json();
    reviews = data.results;
    const divReview = document.querySelector(".review");
    console.log("Reviews  : ", reviews);
    for (let i = 0; i < reviews.length; i++) {
      let divIndividualReview = document.createElement("div");
      let titleImg = document.createElement("div");
      let titleImgDate = document.createElement("div");

      let author = document.createElement("p");
      author.className = "authors";
      let textAuthor = document.createTextNode(reviews[i].author);
      author.appendChild(textAuthor);
      let svg = document.createElement("img");
      svg.src = "SVG/feedback_message_chat_review_icon_220539.svg";
      svg.alt = "svg_chat";
      svg.width = 40;
      svg.height = 40;
      titleImg.appendChild(svg);
      titleImg.appendChild(author);
      titleImgDate.appendChild(titleImg);
      titleImg.className = "title_img";
      let divReviewCreateDate = document.createElement("div");
      titleImgDate.className = "title_img_date";
      console.log(reviews[i].created_at);
      let created_date = document.createElement("p");
      let correctDate = new Date(reviews[i].created_at);

      correctDate =
        correctDate.getFullYear() +
        "-" +
        (correctDate.getMonth() + 1) +
        "-" +
        correctDate.getDate() +
        "  " +
        correctDate.getUTCHours() +
        ":" +
        correctDate.getMinutes() +
        ":" +
        correctDate.getSeconds();
      let dateText = document.createTextNode(correctDate);
      divReviewCreateDate.className = "div_review_create_date";
      created_date.appendChild(dateText);
      divReviewCreateDate.appendChild(created_date);
      titleImgDate.appendChild(divReviewCreateDate);
      divIndividualReview.appendChild(titleImgDate);

      divReview.appendChild(divIndividualReview);
      divIndividualReview.setAttribute("class", "individual_review");

      let review = document.createElement("p");
      let textReview = document.createTextNode(reviews[i].content);
      review.appendChild(textReview);
      divIndividualReview.appendChild(review);

      divReview.appendChild(divIndividualReview);
    }
    hideSpinner(".section_reviews");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

function myPersonalError(titleError, message) {
  hideDetails();
  hideComments();
  const divError = document.querySelector(".error_personal");
  const ertitle = document.createElement("h2");
  ertitle.className = "title_error";
  const erp = document.createElement("p");
  erp.className = "text_error";
  const textp = document.createTextNode(message);
  const texttitle = document.createTextNode(titleError);
  erp.appendChild(textp);
  ertitle.appendChild(texttitle);
  divError.appendChild(ertitle);
  divError.appendChild(erp);
  const cuerpoDiv = document.querySelector(".main");
  console.log(cuerpoDiv.attributes);
  cuerpoDiv.className = "div_style_error";
  cuerpoDiv.appendChild(divError);
  document.querySelector(".details > .spinner").className =
    "hide_spinner_details";
  document
    .querySelector(".section_reviews > .spinner")
    .setAttribute("class", "hide_spinner_reviews");
  document
    .querySelector(".title_details ")
    .setAttribute("class", "hide_title_details");
  document
    .querySelector(".title_reviews")
    .setAttribute("class", "hide_title_reviews");

  document
    .querySelector(".div_style_error")
    .setAttribute("style", "width: 100%;height: 100%;");
  document.body.setAttribute(
    "style",
    "width: 100%;height: 100%;  overflow: hidden;",
  );
  document
    .getElementsByTagName("html")[0]
    .setAttribute("style", "width: 100%;height: 100%;");
  divError.setAttribute("style", "display:flex");
}
