import getReviewFilm from "../Javascript/getReviewsFilmId.js";
import getFilmDetails from "../Javascript/getFilmID.js";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('filmid')
console.log(id);

let error = false;
let loading = true;
const url = getReviewFilm(id);
const url2 = getFilmDetails(id);

console.log("review url : ", url);
console.log("details url : ", url2);
await getUrlDetails(id);
await getUrlReviewsFilm(id);

function checkError() {
    if (error === true) {
        document.getElementsByClassName('main')[0].removeChild(document.getElementsByClassName('error')[0]);
        error = false;
    }
}

async function getUrlDetails(id) {
    checkError();
    let baseUrl = "https://image.tmdb.org/t/p/w300";
    const url = getFilmDetails(id);
    try {
        console.log("Dentro de getURL Details", id);
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        //throw ('There is a problem in catching the data from the api');
        let data = await response.json();
        console.log(data);
        document.getElementById('mainImg').src = baseUrl + data.poster_path;
        document.getElementsByTagName("h1")[0].innerHTML = data.title;
        document.querySelector(".description p").innerHTML = data.overview;
        document.getElementById('release').innerHTML += data.release_date;
        document.querySelector(".popularity p").innerHTML = data.popularity;
        let genres = data.genres;
        console.log("los géneros son : ", genres[0].name);
        for (let i = 0; i < genres.length; i++) {
            let genretiquette = document.createElement("div");
            genretiquette.className = "genretiquette";
            let genre = document.createElement("p");
            let textGenre = document.createTextNode(genres[i].name);
            genre.appendChild(textGenre);
            genretiquette.appendChild(genre);
            document.getElementsByClassName("types")[0].appendChild(genretiquette);
        }

        document.querySelector(".votes p").innerHTML = data.vote_average;
        if (data.title === "" && !error) {
            myPersonalError('Without coincidences', 'There is not available data');
            loading = false;
        }
    } catch (e) {
        myPersonalError('Error', 'Please, recharge the page');
        alert('Please, recharge the page');
        loading = false;
    }
}

async function getUrlReviewsFilm(id) {
    checkError();
    let reviews = [];
    const url = getReviewFilm(id);
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        //throw ('There is a problem in catching the data from the api');
        let data = await response.json();
        reviews = data.results;
        let divReview = document.getElementsByClassName("review")[0];
        console.log("la div review : ", divReview);
        console.log("Reviews  : ", reviews);
        for (let i = 0; i < reviews.length; i++) {
            let divIndividualReview = document.createElement("div");
            let titleImg = document.createElement("div");

            let author = document.createElement("h3");
            let textAuthor = document.createTextNode(reviews[i].author);
            author.appendChild(textAuthor);
            let svg = document.createElement("img");
            svg.src = "SVG/feedback_message_chat_review_icon_220539.svg";
            svg.alt = "svg_chat";
            svg.className = "svg_feedback";
            svg.width = 40;
            svg.height = 40;
            titleImg.appendChild(svg);
            titleImg.appendChild(author);
            titleImg.className = "titleImg";
            let divReviewCreateDate = document.createElement("div");

            console.log(reviews[i].created_at);
            let created_date = document.createElement("p");
            let correctDate = new Date(reviews[i].created_at);

            correctDate = (correctDate.getFullYear() + "-" + (correctDate.getMonth() + 1) + "-" + correctDate.getDate() + "  " + correctDate.getUTCHours() + ":" + correctDate.getMinutes() + ":" + correctDate.getSeconds());
            let dateText = document.createTextNode(correctDate);
            divReviewCreateDate.className = "divReviewCreateDate";
            created_date.appendChild(dateText);
            divReviewCreateDate.appendChild(created_date);
            divIndividualReview.appendChild(titleImg);

            divIndividualReview.appendChild(divReviewCreateDate);


            divReview.appendChild(divIndividualReview);
            divIndividualReview.setAttribute("class", "IndividualReview");


            let review = document.createElement("p");
            let textReview = document.createTextNode(reviews[i].content);
            review.appendChild(textReview);
            divIndividualReview.appendChild(review);

            divReview.appendChild(divIndividualReview);
        }

        /* if (this.films.length === 0 && !this.error) {
                    myPersonalError('Without coincidences', 'There is not available data');
                    loading = false;
         }*/
    } catch (e) {
        myPersonalError('Error', 'Please, recharge the page');
        console.error(e);
        loading = false;
    }
}

function myPersonalError(titleError, message) {
    error = true;
    const div = document.createElement("div");
    div.setAttribute('class', 'error');
    div.setAttribute('style', 'width:100%;background-color:#ffb0b0;text-align:center;');
    let ertitle = document.createElement('h2');
    let erp = document.createElement('p');
    let textp = document.createTextNode(message);
    let texttitle = document.createTextNode(titleError);
    erp.appendChild(textp);
    ertitle.appendChild(texttitle);
    div.appendChild(ertitle);
    div.appendChild(erp);
    const cuerpoDiv = document.getElementsByClassName('main')[0];
    cuerpoDiv.appendChild(div);
}

