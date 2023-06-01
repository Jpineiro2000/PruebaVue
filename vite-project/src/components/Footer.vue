<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Footer"
})
</script>

<template>
  <footer>
    <p>Author: Hege Refsnes<br>
      <a href="mailto:hege@example.com">hege@example.com</a></p>
  </footer>
</template>

<style scoped>
footer {
  text-align: center;
  padding: 3px;
  background-color: DarkSalmon;
  color: white;
}
</style>