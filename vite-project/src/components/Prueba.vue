<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Prueba",
  props:{
    title:String,
    img:String,
    description:String,
  }
})
</script>

<template>
  <div class="card">
    <img v-bind:src="img" class="img-fluid ancho" v-bind:alt="title">
    <div class="container">
      <h4><b>{{title}}</b></h4>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>