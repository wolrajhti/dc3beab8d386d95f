import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Forgot from './components/Forgot.vue'
import Signup from './components/Signup.vue'

const routes = [
  { path: '/', redirect: '/home'},
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/forgot', component: Forgot },
  { path: '/signup', component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app')
