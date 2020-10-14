import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import uTitle from './components/u-title/index.vue';
import uBody from './components/u-body/index.vue';
import uTabbar from './components/u-tabbar/index.vue';

Vue.component('u-title', uTitle);
Vue.component('u-body', uBody);
Vue.component('u-tabbar', uTabbar);

new App().$mount()
