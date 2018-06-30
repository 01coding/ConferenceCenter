import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OrganizationSpace from '@/components/OrganizationSpace/Main';
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/orgspace',
      name: 'OrganizationSpace',
      component: OrganizationSpace
    }
  ]
})
