<script>

import {defineComponent} from 'vue'
import FilmCard from "./FilmCard.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import ButtonPagination from "./ButtonPagination.vue";

export default defineComponent({
  name: "FilmDisplay",
  components: {ButtonPagination, Footer, Header, FilmCard},
  data() {
    return {
			mainUrl:"https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17",
      //columns:['Title','Image','Description',''],
      //loading : true,
      total_pages : 0,
			//Las páginas están a 500 a pesar de que tiene muchas más debido a que la url de la API no permite acceder a más.
      actual_page: 1,
      films:[],
      baseUrl : "https://image.tmdb.org/t/p/w300",
			//Al poner las imágenes en 300 en vez de 400 , hay algunas que no admiten este formato y la img se queda en null
			//Las dimensiones disponibles de los píxeles son de 300 a 500 píxeles
    }
  },
  methods:{
		async search(){
			//alert(query);
				//this.mainUrl=`https://api.themoviedb.org/3/search/movie?api_key=66ae687f31e3066ab23a1b7128278d17&query=${query}`;
			//	alert("Search : "+this.mainUrl);
			 await this.useApi(this.mainUrl);
			 
				/*if(this.films.length===0){
					const  app = document.getElementById(("app"))
					const collection = document.getElementsByClassName("btn-group");
				/*if(this.films.length===0){
					const  app = document.getElementById(("app"))
					const collection = document.getElementsByClassName("btn-group");
					app.removeChild(document.get
				/*if(this.films.length===0){
					const  app = document.getElementById(("app"))
					const collection = document.getElementsByClassName("btn-group");
					app.removeChild(document.get
					app.removeChild(document.getElementById('actual_page'));
					for (let i = 0; i < collection.length; i++) {
						app.removeChild(collection[i]);
					}
					const div = document.createElement("div");
					div.setAttribute('style','width:100%;background-color:#A5E3F1FF;text-align:center;');
					let ertitle = document.createElement('h5');
					let textTitle = document.createTextNode('No hay resultados');
					ertitle.appendChild(textTitle);
					div.appendChild(ertitle);
					console.log(e.message);
					const cuerpoDiv = document.getElementsByClassName('container')[0];
					cuerpoDiv.appendChild(div);
				}*/
		},
		
		async paginationFather(num){
			await this.useApi(num);
		},
		
		async useApi(query) {
			let url = `https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17`;
			if(query==="search"){
				url.replace("discover","search");
				url+= `&query=${query}`;
				alert("Search : "+query);
			}else if(Number.isInteger(query)){
				url+= `&page=${query}`;
				alert("Change of page");
			}
			console.log("actual url : ",url)
			
			try {
        let response = await fetch(url);
        if(!response.ok) {
					throw new Error(`HTTP error ${response.status}`);
				}
          //throw ('There is a problem in catching the data from the api');
        let data = await response.json();
        console.log(data);
        this.films = data.results;
        this.actual_page = data.page;
				this.total_pages = data.total_pages;
        this.loading = false;
			}catch (e){
          //Div message error
				const  app = document.getElementById(("app"))
				const collection = document.getElementsByClassName("btn-group");
				app.removeChild(document.getElementById('actual_page'));
				for (let i = 0; i < collection.length; i++) {
					app.removeChild(collection[i]);
				}
        const div = document.createElement("div");
				div.setAttribute('style','width:100%;background-color:#ffb0b0;text-align:center;');
				let ertitle = document.createElement('h2');
				let erp = document.createElement('p');
				let textp = document.createTextNode('Por favor, recargue la página');
				let texttitle = document.createTextNode('Error');
				erp.appendChild(textp);
				ertitle.appendChild(texttitle);
				div.appendChild(ertitle);
				div.appendChild(erpin);
				console.log(e.message);
        const cuerpoDiv = document.getElementsByClassName('container')[0];
				cuerpoDiv.appendChild(div);
			}
     }
  },
   mounted(){
     this.useApi("discover");
  }
})
</script>

<template>
  <Header @onsubmit="this.useApi('search')"></Header>
  <h2 id="actual_page">Page : {{actual_page}}</h2>
  <div class="container">
        <FilmCard  v-for="film in films"
            :title="film.title" :description="film.overview" :img="baseUrl + film.poster_path"  :total_pages="this.total_pages" :actual_page="this.actual_page"></FilmCard>
  </div>
  <div class="d-flex align-items-center" v-if="loading">
    <strong>Loading...</strong>
  <div class="loader"></div>
  </div>
	<button-pagination @pagination="paginationFather" :total_pages="this.total_pages" :actual_page="this.actual_page"></button-pagination>

  <Footer></Footer>
</template>

<style scoped>

.container{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

@media screen and (max-width: 600px) {
	.container {
		background-color: lightblue;
	}
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
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
.btn-group {
	padding: 5px;
	margin-bottom: 10px;
	display : flex;
	flex-direction: row;
	gap: 5px;
	justify-content: center;
}
.btn-group button {
	
	background-color: #04AA6D; /* Green background */
	border: 1px solid green; /* Green border */
	color: white; /* White text */
	padding: 10px 24px; /* Some padding */
	cursor: pointer; /* Pointer/hand icon */
}
button:disabled{
	background-color: lightgray;
	border: 1px solid black;
}

.btn-group button:not(:last-child) {
	border-right: none; /* Prevent double borders */
}

.btn-group button:hover:enabled {
	background-color: #3e8e41;
}
</style>