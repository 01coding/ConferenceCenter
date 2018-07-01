import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ConferenceInfo from '@/components/ConferenceInformation/Conference'
import Contribute from '@/components/Contribute';
import Index from '@/components/Index'
import Login from '@/components/Login/Login'
import UserRegister from '@/components/Register/UserRegister'
import InstitutionRegister from '@/components/Register/InstitutionRegister'
import Search from '@/components/Search'
import ReviewApplication from '../components/OperationManagement/ReviewApplication'

import OrganizationSpace from '@/components/OrganizationSpace/Main';
import OrgConferences from '@/components/OrganizationSpace/Conferences';
import NewConference from '@/components/OrganizationSpace/NewConference';
import OrgContributions from '@/components/OrganizationSpace/Contributions';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/conference/:id',
      name: 'ConferenceInfo',
      component: ConferenceInfo
    },
    {
      path: '/contribute',
      name: 'Contribute',
      component: Contribute,
    },
    {
      path: '/orgspace',
      component: OrganizationSpace,
      children: [
        {
          path: '',
          component: OrgConferences
        },
        {
          path: 'conferences',
          component: OrgConferences
        },
        {
          path: 'new/conference',
          component: NewConference
        },
        {
          path: 'conference/:id/contributions',
          component: OrgContributions
        }
      ]
    },
    {
      path: '/new/conference',
      name: 'NewConference',
      component: NewConference,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userRegister',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/institutionRegister',
      name: 'InstitutionRegister',
      component: InstitutionRegister
    },
    {
      path:'/review/application',
      name:'ReviewApplication',
      component:ReviewApplication
    }
  ]
})
