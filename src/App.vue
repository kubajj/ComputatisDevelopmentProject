<template>
	<div>
		<app-navigation></app-navigation>	
		<!--app-content></app-content-->	
		<router-view></router-view>
		<app-footer></app-footer>
	</div>
</template>

<style>
	a {
		color: black;
		text-decoration: underline;
	}

	a:active, a:hover {
		color: #205D7E;
	}

	body { 
		background-color:#202020;  
	    color: white;
	    font-family: monospace;
	}

	.btn.btn-secondary {
		background-color:#0382BC;
		border: none;
	}

	.content {
		margin-top: 15px;
		color: black;
		background-color: white;
		min-height: 300px;
	}

	.title {
		text-align: center;
	}

	.textContent {
		text-align: center;
	}
</style>