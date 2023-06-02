<script>

import {defineComponent} from 'vue'
import FilmCard from "./FilmCard.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

const api = async function () {
  let response = await fetch(`https://api.thhibpihemoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17&page=4`);
  return await response.json();
}

export default defineComponent({
  name: "FilmDisplay",
  components: {Footer, Header, FilmCard},
  data() {
    return {
      //columns:['Title','Image','Description',''],
      //loading : true,
      total_pages : 0,
      actual_page: 0,
      films:[],
      baseUrl : "https://image.tmdb.org/t/p/w300"
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
            this.total_pages = data.total_pages;
            this.loading = false;
          }).catch(err=>{
          console.error("errr")
      })
    },*/
    async useApi() {
      try {
        const data = await api();
        console.log(data);
        this.films = data.results;
        this.actual_page = data.page;
        this.total_pages = data.total_pages;
        this.loading = false;
        if(!data)
          throw ('There is a problem in catching the data from the api');
      }catch (e){
          //Div message error
        const div = document.createElement("div");
        div.innerHTML="<h2>" + e.name + "</h2>" +
            "<p>" + e.description + "</p>";
        document.body.appendChild(div);
      }
     }

  },
   mounted(){
     this.useApi();

  }
})
</script>

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
  <button @click="greet">Greet</button>
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
</style>