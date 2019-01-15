
import HomeContent from './Content/HomeContent.vue'
import PracContent from './Content/PracContent.vue'
import UvodKProcvicovani from './Content/PracContentFiles/UvodKProcvicovani.vue'
import DefaultComponent from './Content/PracContentFiles/Components/DefaultComponent.vue'

export default [
	{ path: '/', component: HomeContent},
	{ path: '/procvicovani', component: PracContent,
		children: [
		{ path: '/', component: UvodKProcvicovani },
		{ path: '/defaultcomponent', component: DefaultComponent },
		]
	},
]