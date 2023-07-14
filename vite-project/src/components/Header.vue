<script>
import {defineComponent} from 'vue'
//this.mainURL search example : https://api.themoviedb.org/3/search/movie?api_key=66ae687f31e3066ab23a1b7128278d17&query=Mario
export default defineComponent({
  name: "Header",
	data() {
		return {
			query: ''
		}
	},
 
	methods: {
		 onsubmit() {
			alert(this.query);
			this.$emit('onsubmit', this.query);
		},
	   myFunction() {
		  let x = document.getElementById("myTopnav");
		  if (x.className === "topnav") {
			 x.className += " responsive";
		  } else {
			 x.className = "topnav";
		  }
		}
	}
})
</script>

<template>
	<nav class="topnav" id="myTopnav">
		<a class="active" href="../../index.html">Home</a>
		<a href="#about">About</a>
		<a href="#contact">Contact</a>
		<div class="search-container">
			<form @submit.prevent="onsubmit">
				<input v-model="query" type="text" placeholder="Search.." id="mySearch" name="search">
				<button><i class="fa fa-search"></i></button>
			</form>
		</div>
	  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
		 <i class="fa fa-bars"></i>
	  </a>
	</nav>
</template>

<style scoped>

* {box-sizing: border-box;}

body {
	margin: 0;
	font-family: Arial, Helvetica, sans-serif;
}

.topnav {
	overflow: hidden;
	background-color: #e9e9e9;
}

.topnav a {
	float: left;
	display: block;
	color: black;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
	font-size: 17px;
}

.topnav a:hover {
	background-color: #ddd;
	color: black;
}
.topnav .icon {
  display: none;
}

.topnav a.active {
	background-color: #2196F3;
	color: white;
}

.topnav .search-container {
	float: right;
}

.topnav input[type=text] {
	padding: 6px;
	margin-top: 8px;
	font-size: 17px;
	border: none;
}

.topnav .search-container button {
	float: right;
	padding: 6px 10px;
	margin-top: 8px;
	margin-right: 16px;
	background: #ddd;
	font-size: 17px;
	border: none;
	cursor: pointer;
}

.topnav .search-container button:hover {
	background: #ccc;
}

@media screen and (max-width: 600px) {
	.search-container {
		width: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-items: end;
	}
  form{
	 display: flex;
	 align-items: center;
	 height: 100%;
	 align-self: end;
	 margin-right: 12px;
  }
  .topnav{
	 display: flex;
	 flex-direction: row;
	 width: 100%;
  }
  #mySearch{
	 width: 100px;
	 margin:0;
  }
  .topnav a:not(:first-child) {
	 display: none;
  }
  .topnav a.icon {
	 float: right;
	 display: flex;
  }
	.topnav a, .topnav input[type=text], .topnav .search-container button {
		margin:0;
	}
	.topnav input[type=text] {
		border: 1px solid #ccc;
	}
}
</style>