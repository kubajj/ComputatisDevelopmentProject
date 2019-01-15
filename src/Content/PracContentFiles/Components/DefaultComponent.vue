<template>
	<div>
		<heading head='Default heading'></heading>
		<b-row>
			<b-col cols='8'>
				<vue-mathjax :formula="task"/>
			</b-col>
			<b-col cols="3">
				<b-form-input
		                type="text"
		                placeholder="Default placeholder"
		                v-model="usersResult"
		                @keyup.native.enter='check'
		                id="inputForm">                   	
		        </b-form-input>
		    </b-col>
	        <b-col cols="1">
	        	<b-button @click="check">✔</b-button>
	        </b-col>
		</b-row>	
		<ch-alerts :checked='checked' :result='result'></ch-alerts>
	</div>
</template>

<script>
	import { bus } from './../../../main.js'
	import { VueMathjax } from 'vue-mathjax'
	import Heading from './../DevelopComponents/Heading.vue'
	import CheckAlerts from './../DevelopComponents/CheckAlerts.vue'

	export default {
		data() {
			return {
				task: '',
				usersResult: '',
				checked: '',
				result: '',
			}
		}, 
		components: {
			'heading': Heading,
			'ch-alerts': CheckAlerts,
		},
		methods: {
			randomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			genTask() {
				this.checked = '';
				this.task = '$$ 1 + 1 = $$';
				this.result = 2;
			},
			check() {
				if (this.checked == 'right') {
					this.genTask();
					return;
				}
				if (this.usersResult == this.result) {
					this.checked = 'right';
				} else {
					this.checked = 'wrong';
				}
				document.getElementById("inputForm").value = '';
			}, 
		},
		beforeMount() {
			this.genTask();
		},
		mounted() {
		    bus.$on('next', this.genTask);
		},  
	}
</script>
