<template>
	<div class="content">
		<!--b-row>
			<b-col cols="2"></b-col>
			<b-col cols="8">
				<b-card no-body>
				  **tady se to asi musí předělat**
				  <b-tabs card end>
				    <b-tab title="Home" active class="tabpill">
				      <home-content></home-content>
				    </b-tab>
				    <b-tab title="Teorie" class="tabpill">
				      <theory-content></theory-content>
				    </b-tab>
				    <b-tab title="Procvičování" class="tabpill">
				      <prac-content></prac-content>
				    </b-tab>
				  </b-tabs>
				</b-card>
			</b-col>
		</b-row>
		<b-col cols="2"></b-col-->
		<b-container>
			<!--router-view></router-view-->
		</b-container>
	</div>
</template>

<script>
	import HomeContent from './Content/HomeContent.vue'
	import PracContent from './Content/PracContent.vue'

	export default {
		components: {
			'home-content': HomeContent,
			'prac-content': PracContent,
		}
	}
</script>

<style>
	.nav-pills .nav-link.active {
		background-color: #0382BC;
	}

	.content {
		margin-top: 15px;
		color: black;
	}

	.title {
		text-align: center;
	}

	.nav-item a {
		color: black !important;
	}

	.tab-content {
		min-height: 225px;
	}


</style>