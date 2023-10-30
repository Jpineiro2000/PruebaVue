<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Error",
  props: {
    string_error: String,
  },
});
</script>
<template>
  <div class="error_personal">
    <h2 class="title_error">Error:</h2>
    <p class="text_error">{{ string_error }}</p>
  </div>
</template>

<style scoped>
.error_personal {
  width: 25rem;
  background-color: #ffb0b0;
  text-align: center;
  box-shadow: 0.9375rem 0 0.9375rem red;
  border-radius: 125rem 125rem 125rem 125rem;
  height: 25rem;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
}

.title_error {
  color: #2e2aad;
  font-size: 40px;
  margin: 0;
}

.text_error {
  color: #0e4935;
  font-size: 25px;
}
</style>
