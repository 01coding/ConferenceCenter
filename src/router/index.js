import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ConferenceInfo from '@/components/ConferenceInformation/Conference'
import OrganizationSpace from '@/components/OrganizationSpace/Main';
import Contribute from '@/components/Contribute';
import Index from '@/components/Index'
import NewConference from '@/components/OrganizationSpace/NewConference';
import ReviewApplication from '../components/OperationManagement/ReviewApplication'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
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
      component: OrganizationSpace,
      children: [
        {
          path: 'new/conference',
          component: NewConference
        }
      ]
    },
    {
      path: '/new/conference',
      name: 'NewConference',
      component: NewConference
    },
    {
      path:'/ReviewApplication',
      name:'ReviewApplication',
      component:ReviewApplication
    }
  ]
})
