import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ConferenceInfo from '@/components/ConferenceInformation/Conference'
import OrganizationSpace from '@/components/OrganizationSpace/Main';
import Contribute from '@/components/Contribute';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/conference',
      name: 'ConferenceInfo',
      component: ConferenceInfo
    },
    {
      path: '/orgspace',
      name: 'OrganizationSpace',
      component: OrganizationSpace
    },
    {
      path: '/contribute',
      name: 'Contribute',
      component: Contribute,
    },
  ]
})
