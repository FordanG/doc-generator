import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Generator from '@/views/Generator.vue'
import LoginView from '@/views/LoginView.vue'
import About from '@/views/About.vue'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/docgen/:id',
    name: 'Generator',
    component: Generator
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  console.log(isAuthenticated)
  if (to.name !== 'LoginView' && !isAuthenticated) next({ name: 'LoginView' })
  else next()
})

export default router
