import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Navigation from './Navigation.vue'
import Content from './Content.vue'
import AppFooter from './AppFooter.vue'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax);
Vue.use(BootstrapVue);
Vue.use(VueRouter);

export const bus = new Vue();
const router = new VueRouter({
	routes: Routes,
	mode: 'history'
});

Vue.component('app-navigation', Navigation);
Vue.component('app-content', Content);
Vue.component('app-footer', AppFooter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
