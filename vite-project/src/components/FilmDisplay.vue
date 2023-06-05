<script>

import {defineComponent} from 'vue'
import FilmCard from "./FilmCard.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

const api = async function () {
  //https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17
  let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17`);
  return await response.json();
}

export default defineComponent({
  name: "FilmDisplay",
  components: {Footer, Header, FilmCard},
  data() {
    return {
      //columns:['Title','Image','Description',''],
      //loading : true,
      total_pages : 500,
			//La imagen está a 500 a pesar de que tiene muchas más debido a que la url de la API no permite acceder a más.
      actual_page: 1,
      films:[],
      baseUrl : "https://image.tmdb.org/t/p/w300"
			//Al poner las imágenes en 300 en vez de 400 , hay algunas que no admiten este formato y la img se queda en null
			//Las dimensiones disponibles de los píxeles son de 300 a 500 píxeles
    }
  },
  methods:{

    /*getApi()
    {
      this.loading = true;
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17`)
          .then(response => response.json())
          .then(data => {
            this.films = data.results;
            this.actual_page = data.page;
            this.total_pages = data.total_pages;results
            this.loading = false;
          }).catch(err=>{
          console.error("errr")
      })
    },*/
		async pagination(num){
			switch (num) {
				case 0:
					this.actual_page++;
					break;
				case 1:
					this.actual_page--;
					break;
				case 2:
					this.actual_page = this.total_pages;
					break;
				case 3:
					this.actual_page = 1;
					break;
			}
			console.log(this.actual_page);
			this.useApi(this.actual_page);
		},
		async useApi( options) {
			const  page = options.page
			console.log("Page : ",page)
			console.log("actual page : ",this.actual_page)
			
			try {
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17&page=${this.actual_page}`);
        if(!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
          //throw ('There is a problem in catching the data from the api');
        let data = await response.json();
        console.log(data);
        this.films = data.results;
        this.actual_page = data.page;
        this.loading = false;
      }catch (e){
          //Div message error
        const div = document.createElement("div");
        div.innerHTML="<h2>" + e.name + "</h2>" +
            "<p>" + e.description + "</p>";
        console.log(e.message, e.messageerror);
        document.body.appendChild(div);
      }
     }
  },
   mounted(){
     this.useApi(`https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17`);
  }
})
</script>
:
<template>
  <Header></Header>
  <h2>Page : {{actual_page}}</h2>
  <div>
        <FilmCard  v-for="film in films"
            :title="film.title" :description="film.overview" :img="baseUrl + film.poster_path"  :total_pages="this.total_pages" :actual_page="this.actual_page"></FilmCard>
  </div>
  <div class="d-flex align-items-center" v-if="loading">
    <strong>Loading...</strong>
  <div class="loader"></div>
  </div>
  <!--<div class="botones">
  <button class="button">Button</button>
  <button class="button">Button</button>
  <button class="button">Button</button>
  <button class="button">Button</button>
  </div>-->
	
	<div class="btn-group">
		<button :disabled="this.actual_page < 3" @click="pagination(3)">&lt;&lt;</button>
		<button :disabled="this.actual_page === 1" @click="pagination(1)">&lt;</button>
		<button :disabled="this.actual_page === this.total_pages" @click="pagination(0)">></button>
		<button :disabled="this.actual_page >= (this.total_pages - 1)" @click="pagination(2)">>></button>
	</div>
  <Footer></Footer>
</template>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
.botones{
  
}
.myError{
  background-color: #f08181;

}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

img {
  border-radius: 5px 5px 0 0;
}
.btn-group button {
	background-color: #04AA6D; /* Green background */
	border: 1px solid green; /* Green border */
	color: white; /* White text */
	padding: 10px 24px; /* Some padding */
	cursor: pointer; /* Pointer/hand icon */
	float: left; /* Float the buttons side by side */
}
button:disabled{
	background-color: lightgray;
	border: 1px solid black;
}
/* Clear floats (clearfix hack) */
.btn-group:after {
	content: "";
	clear: both;
	display: table;
}

.btn-group button:not(:last-child) {
	border-right: none; /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group button:hover {
	background-color: #3e8e41;
}
</style>