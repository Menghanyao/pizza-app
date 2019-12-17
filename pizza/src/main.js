import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'

import {store} from './store/store.js'

axios.defaults.baseURL='http://localhost:3000/'

Vue.use(VueRouter)

//配置vue原型（在任何组件中都可使用axios）
//Vue.prototype.http=axios

const router=new VueRouter({
	routes,
	mode:'history',
	scroolBehavior(to,from,savedPosition){
		return{
			x:0,y:100
		}
	}
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
