import Vue from 'vue'
import Router from 'vue-router'
import ConferenceInfo from '@/components/ConferenceInformation/Conference'
import OrganizationSpace from '@/components/OrganizationSpace/Main';
import Index from '@/components/Index'
import NewConference from '@/components/OrganizationSpace/NewConference';
import Login from '@/components/Login/Login'
import UserRegister from '@/components/Register/UserRegister'
import InstitutionRegister from '@/components/Register/InstitutionRegister'
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
      path:'/ReviewApplication',
      name:'ReviewApplication',
      component:ReviewApplication
    }
  ]
})
