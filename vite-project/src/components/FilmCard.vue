<script>
import {defineComponent} from 'vue'
export default defineComponent({
  data(){
    return{
      visibility: false
    }
  },
  name: "FilmCard",
  props:{
    title:String,
    img:String,
    description:String,
  },
  computed: {
    computedHide: function () {
      return this.visibility;
    }
  },
  methods:{
    showMore:function(){
    this.visibility = !this.visibility
    }
  }
})
</script>

<template>
    <div class="card">
		<picture>
		  <source media="(min-width:400px)" v-bind:srcset="img"  style="max-width:100%;height:auto;width: 300px">
		  <img class="card-img-top" v-bind:src="img" v-bind:alt="title" style="max-width:100%;height:auto;">
		</picture>
      <article class="card-body">
        <p class="card-title"><b>{{title}}</b></p>
        <p class="card-text">{{ description }}</p>
        <button @click="showMore">See more</button>
        <div class="descriptions" v-show="computedHide">{{ description }}</div>
      </article>
    </div>
</template>

<style scoped>

.card-title {
  font-size: 20px;
}

div.descriptions {
  top: 0;
  background-color: rgba(210, 201, 93, 0.84);
  padding: 35px;
  position: relative;
  font-size: 20px;
  z-index: 1;
  overflow: auto;
  width: 130px;
  height: 60px;
}
.card-text{
  white-space: nowrap;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
}

h5{
  font-size :20px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  min-width: 300px;
  width: 300px;
  border-radius: 5px;
  margin: 10px;
  height: auto;
  max-height: 650px;
}
.card-body{
  height: auto;
  max-height: 3000px;
  padding: 10px;
  
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

@media screen and (max-width: 600px) {
  img{
	 height: auto;
	 width: 300px;
  }
  .card{
	 max-width: 300px;
	 width: 300px;
	 margin: 0 0 20px;
  }
  .card-body{
	 margin-bottom: 25px;
  }
}
</style>