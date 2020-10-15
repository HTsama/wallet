import Vue from 'vue'
import App from './App.vue'
import { utilsInterface, globalDataInterface } from "./core/interface";

Vue.config.productionTip = false;

import uTitle from './components/u-title/index.vue';
import uBody from './components/u-body/index.vue';
import uTabbar from './components/u-tabbar/index.vue';


import utils from './util/index';
declare module 'vue/types/vue' {
  interface Vue {
    $utils: utilsInterface;
    globalData: globalDataInterface;
  }
}




Vue.prototype.$utils = utils;

Vue.component('u-title', uTitle);
Vue.component('u-body', uBody);
Vue.component('u-tabbar', uTabbar);

new App().$mount()
