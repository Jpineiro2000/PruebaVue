<script setup>
//import HelloWorld from './components/HelloWorld.vue'
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import FilmDisplay from "./components/FilmDisplay.vue";
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
  <div class="container">
	 <div class="header">
		<Header></Header>
	 </div>
	 <div class="main">
		<FilmDisplay></FilmDisplay>
		
	 </div>
    <div class="footer">
		<Footer></Footer>
    </div>
  </div>


</template>

<style scoped>
.container{
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
  background-color: red;
  height: 100px;
  width: 100%;
}


</style>
