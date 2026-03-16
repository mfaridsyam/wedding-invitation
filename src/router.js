import { createRouter, createWebHistory } from 'vue-router'
import WeddingView  from './views/WeddingView.vue'
import NotFoundView from './views/NotFoundView.vue'

const routes = [
  { path: '/:slug/to:guest', component: WeddingView },
  { path: '/:slug/',         component: WeddingView },
  { path: '/:slug',          component: WeddingView },
  { path: '/404',            component: NotFoundView },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
