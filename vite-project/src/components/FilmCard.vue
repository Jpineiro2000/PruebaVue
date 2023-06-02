<script>
import {defineComponent} from 'vue'
//Hacer paginación primero, utilizando los eventos del hijo al padre.
//Arreglar el css , lo que tenga que ver con el conjunto de cards va en el padre. Usar Flex o grid
export default defineComponent({
  data(){
    return{
      visibility: 'hidden'
    }
  },
  name: "FilmCard",
  props:{
    title:String,
    img:String,
    description:String,
    total_pages:Number,
    actual_page:Number,
  },
  computed: {
    computedHide: function () {
      return this.visibility;
    }
  },
  methods:{
    showMore:function(){
      if(this.visibility==='visible'){
        this.visibility = "hidden";
      }else{
        this.visibility='visible';
      }
    }
  }
})
</script>

<template>
    <div class="card">
      <img class="card-img-top" v-bind:src="img" v-bind:alt="title">
      <div class="card-body">
        <h5 class="card-title"><b>{{title}}</b></h5>
        <p class="card-text">{{ description }}</p>
        <button @click="showMore">See more</button>
        <div class="sticky" v-bind:style="{ visibility: computedHide }">{{ description }}</div>
      </div>
    </div>
</template>

<style scoped>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: rgba(210, 201, 93, 0.84);
  padding: 50px;
  font-size: 20px;
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
  width: 25%;
  float: left;
  border-radius: 5px;
  margin: 15px;
  height: 650px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>