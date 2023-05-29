<script>
import {defineComponent} from 'vue'
import Prueba from "./Prueba.vue";


export default defineComponent({
  name: "FilmDisplay",
  components: {Prueba},
  data() {
    return {
      //columns:['Title','Image','Description',''],
      films:[],
      baseUrl : "https://image.tmdb.org/t/p/w300"
    }
  },
  methods:{
    getFilms()
    {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=66ae687f31e3066ab23a1b7128278d17`)
          .then(response => response.json())
          .then(data => {
            this.films = data;
          })
    },

  },
  template:`
    <h2>Round Card</h2>

    <div v-if="films.results">
    <div v-for="film in films.results">
      <Prueba  :title="film.title" :description="film.overview" :img="baseUrl + film.poster_path"></Prueba>
    </div>
    </div>
    <button type="button"></button>

  `,
  mounted(){
    this.getFilms();

  }
})
</script>
<!--
<template>
  <h2>Round Card</h2>

  <div v-if="films.results">
    <div v-for="film in films.results">
      <Prueba  :title="film.title" :description="film.overview" :img="baseUrl + film.poster_path"></Prueba>
    </div>
  </div>
  <button type="button"></button>
</template>-->

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: auto;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
  position: relative;
}
.acorto{
  white-space: nowrap;
  height: 20px;
  width: 290px;
  overflow: hidden;

  text-overflow: ellipsis;
}

</style>