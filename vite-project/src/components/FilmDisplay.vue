<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FilmDisplay",
  data() {
    return {
      films:[]
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
  }
})
</script>

<template>
  <table>
    <thead>
    <tr>
      <th v-for="key in columns">{{key}}</th>
    </tr>
    </thead>
    <tbody v-if="films.results">
    <!--Componente que pinte el contenido de la tabla-->
    <tr v-for="film in films.results">
      <td>{{film.title}}</td>
      <td><img v-bind:src="'https://image.tmdb.org/t/p/w200' + film.poster_path" class="img-fluid ancho" v-bind:alt="film.title"></td>
      <td>    <!-- La elispsis sólo funciona con los tags div y p-->
        <p class="acorto"> {{film.overview}} </p>
      </td>
      <td>
        <button id="more">See more</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>