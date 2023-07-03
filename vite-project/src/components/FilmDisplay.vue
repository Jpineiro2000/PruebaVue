<script>

import {defineComponent} from 'vue'
import FilmCard from "./FilmCard.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import ButtonPagination from "./ButtonPagination.vue";
import getUrlTheMovieDB from "../getUrlTheMovieDB.js";
export default defineComponent({
  name: "FilmDisplay",
  components: {ButtonPagination, Footer, Header, FilmCard},
  data() {
    return {
		currentQuery:"",
		loading: false,
		
		mainURL:"https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17",
      //columns:['Title','Image','Description',''],
      //loading : true,
      total_pages : 0,
			//Las páginas están a 500 a pesar de que tiene muchas más debido a que la this.mainURL de la API no permite acceder a más.
      actual_page: 1,
      films:[],
      baseUrl : "https://image.tmdb.org/t/p/w300",
			//Al poner las imágenes en 300 en vez de 400 , hay algunas que no admiten este formato y la img se queda en null
			//Las dimensiones disponibles de los píxeles son de 300 a 500 píxeles
		error:false,
	 }
  },
  methods:{
		 paginationFather(page){
			this.getUrl(this.currentQuery, page);
		 },
	 search(query){
			this.actual_page = 1;
			this.currentQuery = query;
		this.getUrl(this.currentQuery, this.actual_page);
	 },
	 
	 async getUrl(query, page){
		
		this.loading = true;
		this.films=[];
		const url = getUrlTheMovieDB(query, page);
		console.log("actual url : ",url);
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
		  if(this.films.length === 0 && !this.error){
			 this.myPersonalError('Without coincidences', 'There is not available data');
		  }
		}catch (e){
			this.myPersonalError('Error', 'Please, recharge the page');
		}
	 },
	 
	 myPersonalError(titleError, message){
		this.error = true;
		const div = document.createElement("div");
		div.setAttribute('class','error');
		div.setAttribute('style','width:100%;background-color:#ffb0b0;text-align:center;');
		let ertitle = document.createElement('h2');
		let erp = document.createElement('p');
		let textp = document.createTextNode(message);
		let texttitle = document.createTextNode(titleError);
		erp.appendChild(textp);
		ertitle.appendChild(texttitle);
		div.appendChild(ertitle);
		div.appendChild(erp);
		const cuerpoDiv = document.getElementsByClassName('container')[0];
		cuerpoDiv.appendChild(div);
	 }
  },
   mounted(){
    // this.useApi(, 0);
		// console.log(this.getUrl("",1)); //url de discovery y página 1
		// console.log(this.getUrl("",2));
		// console.log(this.getUrl("Dolphin",1)); //url de search con query=Dolphin y page=1
	//	 console.log(this.getUrl(8,null));	//esto devuelve un error
		this.getUrl("",this.actual_page);
  }
})
</script>

<template>
  <div class="main">
	<div v-show="!error" id="title">
	  <h1 id="actual_page">Page : {{actual_page}}</h1>
	</div>
  <button-pagination class="btn-group" v-show="!error" :actual_page="this.actual_page" :total_pages="this.total_pages" @pagination="paginationFather"></button-pagination>
  <img v-show="loading" id="spinner" alt="spinning" height="200" src="../Images/Spinner.gif" width="200">
  <div class="container">
		<FilmCard  v-for="film in films"  v-show="!error || !loading"
					  :actual_page="this.actual_page" :description="film.overview" :img="baseUrl + film.poster_path"  :title="film.title" :total_pages="this.total_pages">
		</FilmCard>
  </div>
	<button-pagination class="btn-group" v-show="!error" :actual_page="this.actual_page" :total_pages="this.total_pages" @pagination="paginationFather"></button-pagination>
  </div>
</template>

<style scoped>
*{
  margin: 20px;
}
#spinner{
  align-self: center;
}
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}
.container{
	display: flex;
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
}

@media screen and (max-width: 600px) {
	.container {
		background-color: lightblue;
	}
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
  //background-color: plum;
	padding: 5px;
	margin-bottom: 10px;
	display : flex;
	flex-direction: row;
	gap: 5px;
	justify-content: center;
}

#spinner{
  margin: auto;
  display: flex;
  justify-content: center;
}

#title{
  display: flex;
  justify-content: center;
}

</style>