<script>
import {defineComponent} from 'vue'
//this.mainURL search example : https://api.themoviedb.org/3/search/movie?api_key=66ae687f31e3066ab23a1b7128278d17&query=Mario
export default defineComponent({
  name: "Header",
	data() {
		return {
		  dropdown: true,
			query: ''
		}
	},
 
	methods: {
		 onsubmit() {
			alert(this.query);
			this.$emit('onsubmit', this.query);
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
	  
	  <div class="dropdown">
		 <button class="dropbtn">    <i class="fa fa-bars"></i>
		 </button>
		 <ul class="dropdown-content">
			<li><a href="#">Link 1</a></li>
			<li><a href="#">Link 2</a></li>
			<li><a href="#">Link 3</a></li>
		 
		 </ul>
	  </div>
	  
	</nav>
</template>
<style scoped>

* {box-sizing: border-box;}
.dropdown{
  display: none;
}
body {
	margin: 0;
	font-family: Arial, Helvetica, sans-serif;
}

.topnav {
	//overflow: hidden;
  position: absolute;
  display: flex;
	background-color: #e9e9e9;
  overflow: auto;
  white-space: nowrap;
}
form{
  position: fixed;
  right: 0;
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
  right: 0;
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
 
  .dropbtn {
	 right: 0;
	 float: right;
	 background-color: #4CAF50;
	 color: white;
	 padding: 16px;
	 font-size: 16px;
	 border: none;
	 position: absolute;
	 cursor: pointer;
  }
  
  .dropdown {
	 position: relative;
	 display: inline-block;
	 list-style: none;
	 float:right;
  }
  
  .dropdown-content {
  	 top:31px;
	 display: none;
	 position: fixed;
	 right: 0;
	 background-color: #f9f9f9;
	 min-width: 160px;
	 box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	 z-index: 1;
  }
  
  .dropdown-content a {
	 color: black;
	 padding: 12px 16px;
	 text-decoration: none;
	 display: block;
  }
  ul{
	 list-style-type: none;
  }
  .dropdown-content a:hover {background-color: #f1f1f1;}
  
  .dropdown:hover .dropdown-content {
	 display: block;
  }
  
  .dropdown:hover .dropbtn {
	 background-color: #3e8e41;
  }
  
  .search-container {
	 width: 100%;
	 display: flex;
	 margin-right: 60px;
	 flex-direction: column;
	 justify-items: end;
	 position: relative;
  }
  
  form {
	 position: absolute;
	 display: flex;
	 align-items: center;
	 height: 100%;
	 align-self: end;
	 margin-right: 12px;
  }
  
  .topnav {
	 overflow: auto;
	 white-space: nowrap;
	 position: absolute;
	 display: flex;
	 flex-direction: row;
	 width: 100%;
  }
  
  #mySearch {
	 width: 100px;
	 margin: 0;
  }
  
  .topnav a:not(:first-child) {
	 display: none;
	 flex-direction: column ;
  }
  
  .topnav a.icon {
	 float: right;
	 display: flex;
  }
  
  .topnav a, .topnav input[type=text], .topnav .search-container button {
	 margin: 0;
  }
  
  .topnav input[type=text] {
	 border: 1px solid #ccc;
  }
}
</style>