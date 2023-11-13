<script>
import { defineComponent } from "vue";

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import FilmDisplay from "./components/FilmDisplay.vue";
import ButtonPagination from "./components/ButtonPagination.vue";
import getUrlTheMovieDB from "./getUrlTheMovieDB.js";
import Error from "./components/Error.vue";
import changePageParams from "./changePageParams.js";

export default defineComponent({
  components: { Error, ButtonPagination, FilmDisplay, Footer, Header },
  data() {
    return {
      myQuery: "",
      currentQuery: "",
      loading: false,
      total_pages: 0,
      //Las páginas están a 500 a pesar de que tiene muchas páginas más debido a que la this.mainURL de la API no permite acceder a más.
      actual_page: 1,
      films: [],
      //Al poner las imágenes en 300 en vez de 400. Hay algunas que no admiten este formato y la img se queda en null
      //Las dimensiones disponibles de los píxeles son de 300 a 500 píxeles
      error: false,
      string_error: "",
      page_charged: false,
    };
  },
  methods: {
    paginationFather(page) {
      window.location.href = "#/?page=" + page;
      this.getUrl(this.currentQuery, page);
    },
    toSon(query) {
      this.myQuery = query;
      this.search(this.myQuery);
    },
    search(query) {
      this.actual_page = 1;
      this.currentQuery = query;
      this.getUrl(this.currentQuery, this.actual_page);
    },
    checkError() {
      if (this.error === true) {
        document
          .getElementsByClassName("containFilms")[0]
          .removeChild(document.getElementsByClassName("error")[0]);
        this.error = false;
      }
    },

    async getUrl(query, page) {
      let new_page = changePageParams();
      console.log("NEW Page", new_page);
      this.checkError();
      this.loading = true;
      this.films = [];
      const url = getUrlTheMovieDB(query, new_page);
      console.log("actual url : ", url);
      try {
        console.log("Dentro de getURL, query :", query);
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        //throw ('There is a problem in catching the data from the api');
        let data = await response.json();
        console.log(data);
        this.films = data.results;
        this.actual_page = new_page;
        this.total_pages = data.total_pages;
        this.loading = false;
        if (this.films.length === 0 && !this.error) {
          this.myPersonalError(
            "Without coincidences",
            "There is not available data",
          );
          this.loading = false;
        }
      } catch (e) {
        console.error(e);
        this.myPersonalError("Error", "Please, recharge the page");
        this.loading = false;
      }
    },

    myPersonalError(titleError, message) {
      this.error = true;
      this.string_error = message;
    },
  },
  watch: {
    query(newQuery) {
      console.log("Dentro de watch mi query : " + newQuery);
      this.search(newQuery);
    },
  },

  mounted() {
    try {
      let current_page = changePageParams();
      console.log("current_page ChangeParams:", current_page);
      this.getUrl("", this.actual_page);

      if (this.myQuery.trim() !== "") {
        this.actual_page = 1;
        this.currentQuery = this.myQuery;
        this.getUrl(this.currentQuery, this.actual_page);
      }
    } catch (e) {
      console.error(e);
      this.myPersonalError("Error", "Page not valid");
    }
  },
});
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
      <img
        v-show="loading"
        id="spinner"
        alt="spinning"
        height="200"
        src="./Images/Spinner.gif"
        width="200"
      />
      <div class="containFilms">
        <FilmDisplay :films="films" v-show="!loading"></FilmDisplay>
      </div>
      <Error v-show="error" :string_error="this.string_error"></Error>
      <button-pagination
        class="btn-group"
        v-show="!error"
        :actual_page="this.actual_page"
        :total_pages="this.total_pages"
        @pagination="paginationFather"
      ></button-pagination>
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
  display: block;
}

.main {
  margin: 30px 0px 0px;
}

#actual_page {
  font-size: 20px;
}

.header {
  background-color: #747bff;
  order: 1;
  height: 50px;
  top: 0;
  position: fixed;
  z-index: 1;
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
  margin-top: 70px;
  justify-content: center;
}

@media screen and (min-width: 1000px) {
  .main {
    background-color: rgba(153, 133, 162, 0.84);
    order: 2;
    flex-direction: column;
    display: flex;
    min-height: calc(100% - 150px);
    width: 100%;
    margin: 70px 20px 20px;
  }

  #actual_page {
    font-size: 30px;
  }

  .containerApp {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
