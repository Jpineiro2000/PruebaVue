<script>
import { defineComponent } from "vue";
import FilmCard from "./FilmCard.vue";

export default defineComponent({
  name: "FilmDisplay",
  components: { FilmCard },
  props: {
    films: Array,
  },

  methods: {
    openFilmPage(filmid) {
      console.log(filmid);
      window.location.href = "/Films/index.html?filmid=" + filmid;
      //window.location.href = "?page=" + filmid;
    },
  },
  data() {
    return {
      baseUrl: "https://image.tmdb.org/t/p/w300",
      see: 0,
    };
  },
  mounted() {
    /*	 const beforeUnloadHandler = (event) => {
		console.log(window.location)
		event.preventDefault()
		// Equivalent to the following legacy mechanisms
		//   event.returnValue = "string";
		//   return "string"; (only works with onbeforeunload)
	 };*/
  },
});
</script>

<template>
  <div class="container">
    <FilmCard
      class="film_cards"
      @click="openFilmPage(film.id)"
      v-for="film in films"
      :description="film.overview"
      :img="baseUrl + film.poster_path"
      :title="film.title"
    >
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
