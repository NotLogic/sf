import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
const JudgeLogin = () => import(/* webpackChunkName: "login" */ '../views/judgeLogin/index.vue')
const Works = () => import(/* webpackChunkName: "works" */ '../views/works/index.vue')
const WorksList = () => import(/* webpackChunkName: "works" */ '../views/works/pages/index.vue')
const WorksDesc = () => import(/* webpackChunkName: "works" */ '../views/works/pages/desc.vue')
const WorksAdmin = () => import(/* webpackChunkName: "works" */ '../views/works/pages/admin.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/judgeLogin',
    name: 'judgeLogin',
    component: JudgeLogin
  },
  {
    path: '/works',
    component: Works,
    redirect: '/works/list',
    children: [
      {
        path: 'list',
        component: WorksList
      },
      {
        path: 'desc',
        component: WorksDesc
      },
      {
        path: 'admin',
        component: WorksAdmin
      }
    ]
  },
  {
    path: '/*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

export default router
