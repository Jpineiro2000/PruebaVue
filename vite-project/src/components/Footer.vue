<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Footer",
});
</script>

<template>
  <footer>
    <div class="content-footer">
      <p>Author: Hege Refsnes</p>
      <p><a href="mailto:hege@example.com">hege@example.com</a></p>
    </div>
  </footer>
</template>

<style scoped>
.content-footer {
  text-align: center;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
}

footer {
  color: white;
  display: flex;
  justify-content: center;
}
</style>
