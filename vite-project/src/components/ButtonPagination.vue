<script>
import {defineComponent} from 'vue'

export default defineComponent({
	name: "ButtonPagination",
	data() {
		return {
		}
	},
	props:{
		actual_page:Number,
		total_pages:Number,
	},
	methods:{
	  // FIX:TODO:
	  nextPage(){
		 let currentPage = this.actual_page;
		 this.$emit('pagination',++currentPage);
	  },
	  previousPage(){
		 let currentPage = this.actual_page;
		 
		 this.$emit('pagination',--currentPage);
	  },
	  lastPage(){
		 console.log("Current page inside function Pagination: lastPage");
		 
		 this.$emit('pagination',this.total_pages);
	  },
	  firstPage(){
		 console.log("Current page inside function Pagination: firstPage");
		 
		 this.$emit('pagination',1);
	  },
		/* pagination(num){
			
			switch (num) {
				case 0:
					this.actual_page++;
					break;
				case 1:
					this.actual_page--;
					break;
				case 2:
					this.actual_page = this.total_pages;
					break;
				case 3:
					this.actual_page = 1;
					break;
			}
			 console.log("Estamos dentro de pagination antes de emit : "+this.actual_page);
			 
			 this.$emit('pagination',this.actual_page);
		},*/
	}
})
</script>

<template>
	<div class="btn-group">
		<button :disabled="this.actual_page < 3" @click="firstPage">&lt;&lt;</button>
		<button :disabled="this.actual_page === 1" @click="previousPage">&lt;</button>
		<button :disabled="this.actual_page === this.total_pages" @click="nextPage">></button>
		<button :disabled="this.actual_page >= (this.total_pages - 1)" @click="lastPage">>></button>
	</div>
<!--  <div class="btn-group">
	 <button :disabled="this.actual_page < 3" @click="pagination(3)">&lt;&lt;</button>
	 <button :disabled="this.actual_page === 1" @click="pagination(1)">&lt;</button>
	 <button :disabled="this.actual_page === this.total_pages" @click="pagination(0)">></button>
	 <button :disabled="this.actual_page >= (this.total_pages - 1)" @click="pagination(2)">>></button>
  </div>-->
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