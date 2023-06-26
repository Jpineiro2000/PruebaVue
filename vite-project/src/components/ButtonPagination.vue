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
	<div class="btn-group">
		<button :disabled="this.current_page < 3" @click="pagination(3)">&lt;&lt;</button>
		<button :disabled="this.current_page === 1" @click="pagination(1)">&lt;</button>
		<button :disabled="this.current_page === this.total_pages" @click="pagination(0)">></button>
		<button :disabled="this.current_page >= (this.total_pages - 1)" @click="pagination(2)">>></button>
	</div>
	
</template>

<style scoped>
.btn-group {
	padding: 5px;
	margin-bottom: 10px;
	display : flex;
	flex-direction: row;
	gap: 5px;
	justify-content: center;
}
.btn-group button {
	
	background-color: #04AA6D; /* Green background */
	border: 1px solid green; /* Green border */
	color: white; /* White text */
	padding: 10px 24px; /* Some padding */
	cursor: pointer; /* Pointer/hand icon */
}
button:disabled{
	background-color: lightgray;
	border: 1px solid black;
}
/* Clear floats (clearfix hack) */

.btn-group button:not(:last-child) {
	border-right: none; /* Prevent double borders */
}

/* Add a background color on hover */
.btn-group button:hover:enabled {
	background-color: #3e8e41;
}
</style>