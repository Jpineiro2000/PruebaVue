<script>

import {defineComponent} from 'vue'
import FilmCard from "./FilmCard.vue";

export default defineComponent({
  name: "FilmDisplay",
  components: {FilmCard},
  props: {
	 films: Array,
  },
  data() {
	 return {baseUrl: "https://image.tmdb.org/t/p/w300"}
	 
  }/*,
  
  methods: {},
  
  mounted() {
	 alert("Mounting FilmDisplay");
  }*/
})
</script>

<template>
  <div class="container">
	 <FilmCard v-for="film in films"
				  :description="film.overview" :img="baseUrl + film.poster_path" :title="film.title">
	 </FilmCard>
  </div>
</template>

<style scoped>
* {
  margin: 20px;
}

.container {
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

</style>