<template>
	<div>
		<b-alert v-if="checked == 'right'" show variant="success">Správně <b-button @click='next' class='right'>⮊</b-button></b-alert>
	    <b-alert v-else-if="checked == 'wrong'" show variant="danger" >Špatně. Správný výsledek je {{ result }}. <b-button @click='next' class='wrong'>⮊</b-button></b-alert>
	</div>
</template>

<script>
	import {bus} from './../../../main.js'

	export default {
		props: ['checked', 'result'],
		methods: {			
			next() {
				bus.$emit('next');
			}
		}
	}
</script> 

<style>
	.alert {
		margin-top: 6px;
	}
	.btn.btn-secondary.right {
		font-size: 15px;
		background-color: #87e59d;
	}
	.btn.btn-secondary.wrong {
		font-size: 15px;
		background-color: #ed5c5c;
	}
</style>