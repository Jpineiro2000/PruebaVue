<script>
import {defineComponent} from 'vue'

export default defineComponent({
	name: "ButtonPagination",
	data() {
		return {
			current_page: 1,
		}
	},
	props:{
		actual_page:Number,
		total_pages:Number,
	},
	methods:{
	  // FIX:TODO:
	  nextPage(){
		 this.current_page = this.actual_page;
		 this.$emit('pagination',this.current_page++);
	  },
	  previousPage(){
		 this.current_page = this.actual_page;
		 this.$emit('pagination',this.current_page--);
	  },
	  lastPage(){
		 this.$emit('pagination',this.total_pages);
	  },
	  firstPage(){
		 this.$emit('pagination',1);
	  },
		 pagination(num){
			 console.log("Estamos dentro de pagination : "+this.current_page);
			 this.current_page = this.actual_page;
			switch (num) {
				case 0:
					this.current_page++;
					break;
				case 1:
					this.current_page--;
					break;
				case 2:
					this.current_page = this.total_pages;
					break;
				case 3:
					this.current_page = 1;
					break;
			}
			 console.log("Estamos dentro de pagination antes de emit : "+this.current_page);
			 
			 this.$emit('pagination',this.current_page);
		},
	}
})
</script>

<template>
<!--	<div class="btn-group">
		<button :disabled="this.current_page < 3" @click="firstPage">&lt;&lt;</button>
		<button :disabled="this.current_page === 1" @click="previousPage">&lt;</button>
		<button :disabled="this.current_page === this.total_pages" @click="nextPage">></button>
		<button :disabled="this.current_page >= (this.total_pages - 1)" @click="lastPage">>></button>
	</div>-->
  <div class="btn-group">
	 <button :disabled="this.current_page < 3" @click="pagination(3)">&lt;&lt;</button>
	 <button :disabled="this.current_page === 1" @click="pagination(1)">&lt;</button>
	 <button :disabled="this.current_page === this.total_pages" @click="pagination(0)">></button>
	 <button :disabled="this.current_page >= (this.total_pages - 1)" @click="pagination(2)">>></button>
  </div>
</template>

<style scoped>

.btn-group button {
	
	background-color: #04AA6D;
	border: 1px solid green;
	color: white;
	padding: 10px 24px;
	cursor: pointer;
}
button:disabled{
	background-color: lightgray;
	border: 1px solid black;
}

.btn-group button:not(:last-child) {
	border-right: none;
}

.btn-group button:hover:enabled {
	background-color: #3e8e41;
}
</style>