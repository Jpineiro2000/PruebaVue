<script>
import {defineComponent} from 'vue'

export default defineComponent({
	name: "ButtonPagination",
	methods:{
		async pagination(num){
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
			this.useApi(this.actual_page);
		},
	}
})
</script>

<template>
	<div class="btn-group">
		<button :disabled="this.actual_page < 3" @click="pagination(3)">&lt;&lt;</button>
		<button :disabled="this.actual_page === 1" @click="pagination(1)">&lt;</button>
		<button :disabled="this.actual_page === this.total_pages" @click="pagination(0)">></button>
		<button :disabled="this.actual_page >= (this.total_pages - 1)" @click="pagination(2)">>></button>
	</div>
</template>

<style scoped>

</style>