import { createWebHistory, createRouter } from 'vue-router'
import AddTask from './components/AddTask.vue'
import Home from './components/Home.vue'
import Task from'./components/Task.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/addTask', component: AddTask },
  { path: '/tasks', component: Task },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router