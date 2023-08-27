<script>
import {defineComponent} from 'vue'

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import FilmDisplay from "./components/FilmDisplay.vue";
import ButtonPagination from "./components/ButtonPagination.vue";
import getUrlTheMovieDB from "./getUrlTheMovieDB.js";

export default defineComponent({
  components: {ButtonPagination, FilmDisplay, Footer, Header},
  data() {
	 return {
		myQuery: '',
		currentQuery: "",
		loading: false,
		mainURL: "https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17",
		total_pages: 0,
		//Las páginas están a 500 a pesar de que tiene muchas páginas más debido a que la this.mainURL de la API no permite acceder a más.
		actual_page: 1,
		films: [],
		//Al poner las imágenes en 300 en vez de 400. Hay algunas que no admiten este formato y la img se queda en null
		//Las dimensiones disponibles de los píxeles son de 300 a 500 píxeles
		error: false,
	 }
  },
  methods: {
	 paginationFather(page){
		this.getUrl(this.currentQuery, page);
	 },
	 toSon(query) {
		this.myQuery = query;
		this.search(this.myQuery);
	 },
	 search(query){
		this.actual_page = 1;
		this.currentQuery = query;
		this.getUrl(this.currentQuery, this.actual_page);
	 },
	 checkError() {
		if(this.error===true){
		  document.getElementsByClassName('containFilms')[0].removeChild(document.getElementsByClassName('error')[0]);
		  this.error = false;
		}
	 },
	 async getUrl(query, page){
		this.checkError();
		this.loading = true;
		this.films=[];
		const url = getUrlTheMovieDB(query, page);
		console.log("actual url : ",url);
		try {
		  console.log("Dentro de getURL ",query);
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
			 this.loading = false;
		  }
		}catch (e){
		  this.myPersonalError('Error', 'Please, recharge the page');
		  this.loading = false;
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
		const cuerpoDiv = document.getElementsByClassName('containFilms')[0];
		cuerpoDiv.appendChild(div);
	 }
  },
  watch:{
	 query(newQuery){
		console.log("Dentro de watch mi query : "+newQuery)
		this.search(newQuery);
	 }
  },
  
  
  mounted(){
	 this.getUrl("",this.actual_page);
	 if (this.myQuery.trim() !== ""){
		this.actual_page = 1;
		this.currentQuery = this.myQuery;
		this.getUrl(this.currentQuery, this.actual_page);}
	 
  }
})


</script>

<template>
  <!--<div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />-->
  <div class="containerApp">
	 <div class="header">
		<Header @onsubmit="toSon"></Header>
	 </div>
	 <div class="main">
		
		<div v-show="!error" id="title">
		  <h1 id="actual_page">🎞🎥 Page : {{ actual_page }}</h1>
		</div>
		<img v-show="loading" id="spinner" alt="spinning" height="200" src="./Images/Spinner.gif" width="200">
		<div class="containFilms">
		  <FilmDisplay :films="films" v-show="!error || !loading"></FilmDisplay>
		</div>
		<button-pagination class="btn-group" v-show="!error" :actual_page="this.actual_page"
								 :total_pages="this.total_pages" @pagination="paginationFather"></button-pagination>
	 </div>
	 
	 <div class="footer">
		<Footer></Footer>
	 </div>
  </div>


</template>

<style scoped>

.containerApp {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}

@media screen and (max-width: 600px) {
  .main {
	 margin: 8px 4px 8px 4px;
  }
  
  #actual_page {
	 font-size: 20px;
  }
}

.header {
  background-color: #747bff;
  order: 1;
  height: 50px;
  position: relative;
  width: 100%;
}

.btn-group {
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
}


.main {
  margin: 20px;
  
  background-color: rgba(153, 133, 162, 0.84);
  order: 2;
  flex-direction: column;
  display: flex;
  min-height: calc(100% - 150px);
  width: 100%;
}

.footer {
  order: 3;
  background-color: #eea8a8;
  height: 100px;
  width: 100%;
}

#spinner {
  align-self: center;
  margin: auto;
  display: flex;
  justify-content: center;
}

#title {
  display: flex;
  justify-content: center;
}
</style>
