// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: 'http://118.89.229.204:8080/server-0.0.1-SNAPSHOT'
});

Vue.prototype.$user = axios.create({
  baseURL: 'http://118.89.229.204:3000'
});

Vue.prototype.$file = axios.create({
  baseURL: 'http://140.143.19.133:8001'
});

Vue.prototype.$picure = axios.create({
  baseURL: 'http://140.143.19.133:8001/uploads'
});

Vue.prototype.$test = axios.create({
  baseURL: 'http://123.206.54.85:3000/mock/14'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
