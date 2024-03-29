// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue';
import 'vue-awesome/icons';
import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import App from './App';
import router from './router';

Vue.use(BootstrapVue);
Vue.component('icon', Icon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
