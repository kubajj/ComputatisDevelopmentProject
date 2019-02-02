<template>
	<div>
	<b-row>
		<b-col cols='2'></b-col>
		<b-col cols='8'>
	  		<b-jumbotron class='content'>
				<div>
					<b-row>
						<b-col>
							<div class='dropdiv'>
								<b-dropdown id="ddown1" text="Default" class="m-md-2">
								    <b-dropdown-item><router-link to='/defaultcomponent'>Default</router-link></b-dropdown-item>
								    <b-dropdown-divider></b-dropdown-divider>
								</b-dropdown>
							</div>
						</b-col>
						<b-col cols="8">
							<router-view/>
						</b-col>
					</b-row>
					<b-row v-if='$route.path != "/procvicovani"'>
						<b-button><router-link to='/procvicovani' class='backandnext'><strong>⮈</strong> Zpět</router-link></b-button>				
						<b-button @click="next" class='backandnext'>Další <strong>⮊</strong></b-button>
					</b-row>
				</div>
			</b-jumbotron>
		</b-col>
		<b-col cols='2'></b-col>
	</b-row>
  </div>
</template>


<script>
	import {bus} from './../main.js';

	export default {
		methods: { 
			next() {
				bus.$emit('next');
			}
		}
	}
</script>

<style>
	.ddown1 {
		background-color:#0382BC;
		border: none;
	}

	a.dropdown-item:active {
		background-color: white;
		color: #205D7E;
	}
	.backandnext {
		margin: 0px 5px 0px 5px;
		text-decoration: none;
		color: white;
	}
	.backandnext:hover {
		text-decoration: underline;
		color: blue;
	}
	.backandnext:active {
		text-decoration: underline;
		color: white;
		background-color: blue;
	}
	.dropdiv {
		margin-top: 5px;
	}
	.hintstyle {
		color: #aaa;
	}
</style>