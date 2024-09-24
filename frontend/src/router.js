import { createWebHistory, createRouter } from 'vue-router'
import AddTask from './pages/AddTask.vue'
import Home from './pages/Home.vue'
import Task from './pages/Task.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home },
  { path: '/addTask', component: AddTask },
  { path: '/tasks', component: Task },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
