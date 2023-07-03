<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Footer"
})
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
  .content-footer{
	 width: 300px;
	 height: 100px;
	 display: flex;
	 flex-direction: column;
  }
  
  footer {
	 //padding: 3px;
	 //background-color: #c78a72;
	 color: white;
	 display: flex;
	 justify-content: center;
  }
</style>