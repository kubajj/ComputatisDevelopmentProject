<template>
		<b-row>
			<b-col>
				<h4>{{ head }}</h4>
			</b-col>
		</b-row>
</template>

<script>
	export default {
		props: ['head'],
	}
</script>

<!--template>
		<b-row>
			<b-col cols='4'>
				<vue-mathjax :formula="heading" class="heading"></vue-mathjax>
			</b-col>
			<b-col cols='8'></b-col>
		</b-row>
</template>

<script>
	export default {
		props: ['head'],
		data() {
			return {
				heading: '$$\\text{' + this.head + '}$$',
			}
		}
	}
</script>

<style scoped>
	.heading {
		font-size: 150%;
	}
</style-->