<template>
	<b-navbar toggleable="md" type="danger" variant="dark" class="navigation">
		<b-navbar-toggle target="nav_collapse"><img src="./assets/menuicon.png" style="height:35px;"></b-navbar-toggle>
		<b-collapse is-nav id="nav_collapse">
		<logo></logo>
		<b-navbar-nav>
			<!--b-nav-item><router-link to='/' class='menu'>Home</router-link></b-nav-item-->
			<!--b-nav-item><router-link to='/teorie' class='menu'>Teorie</router-link></b-nav-item-->
			<b-nav-item><router-link to='/procvicovani' class='menu'>Procvičování</router-link></b-nav-item>
		</b-navbar-nav>
		<search></search>
		</b-collapse>
	</b-navbar>
</template>

<script>
	import Search from './Search.vue'
	import Logo from './Logo.vue'

	export default {
		components: {
			'logo': Logo,
			'search': Search,
		}
	}
</script>

<style>
	.navigation {
		background-color: #ccc;
	}

	.menu {
		color: white;
		text-decoration: none;
	}
</style>