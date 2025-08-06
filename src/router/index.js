import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import AddTask from '../views/AddTask.vue'
import EditTask from '../views/EditTask.vue'
import TaskDetails from '../views/TaskDetails.vue'

const routes = [
  { path: '/', component: Welcome },
  { path: '/home', component: Home },
  { path: '/AddTask', component: AddTask },
  { path: '/EditTask', component: EditTask },
  { path: '/task/:id', component: TaskDetails }, // dynamic route
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
