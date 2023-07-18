<script>
import {defineComponent} from 'vue'

import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import FilmDisplay from "./components/FilmDisplay.vue";
export default defineComponent ({
  components: {FilmDisplay, Footer, Header},
  data(){
	 return {
	 myQuery : '',
  }
  },
  methods: {
	 toSon(query) {
		this.myQuery= query;
		alert("Dentro de App : "+this.myQuery);
	 }
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

<!--		<FilmDisplay :query="myQuery"></FilmDisplay>-->

	 </div>
    <div class="footer">
		<Footer></Footer>
    </div>
  </div>


</template>

<style scoped>

.containerApp{
	 height: 100%;
	 width: 100%;
  display: flex;
  flex-flow: row wrap;
}
.header{
  background-color: #747bff;
  order: 1;
  height: 50px;
  width: 100%;
}

.main{
  background-color: rgba(153, 133, 162, 0.84)                                                                                                                                                                                                                                                    ;
  order : 2;
  flex-wrap: wrap ;
  display: flex;
  min-height: calc(100% - 150px);
  width: 100%;
}

.footer{
  order:3;
  background-color: #eea8a8;
  height: 100px;
  width: 100%;
}
</style>
