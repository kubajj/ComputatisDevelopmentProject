<template>
	<b-form-input
		@input.native="onInput"
		type="text"
        class="inputWithBorder"
        v-model="inputValue"
        :state="checked">        	
    </b-form-input>
</template>

<script>
	import {bus} from './../../../main.js'
	export default {
		props: {
			value: {
				type: String
			},
			correctResult: {
				type: String
			},
		},
		data() {
			return {
				checked: false,
				inputValue: this.value
			}
		},
		watch: {
			value (newValue) {
				this.inputValue = newValue
			},
		},
		methods: {
			onInput() {
				this.$emit('input', this.inputValue);			
				if (this.inputValue == this.correctResult) {
					this.checked = true;
				}				
			},			
		},
	}
</script>