import Vue from 'vue'
import App from './App.vue'
import { utilsInterface, globalDataInterface, WalletConfigInterface } from "./core/interface";

Vue.config.productionTip = false;

// 引入组件
import uTitle from './components/u-title/index.vue';
import uBody from './components/u-body/index.vue';
import uTabbar from './components/u-tabbar/index.vue';
import uInput from './components/u-input/index.vue';
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode';
// 引入工具类
import utils from './util/index';
// 引入配置
import { WALLET_CONFIG } from './config/config';
declare module 'vue/types/vue' {
  interface Vue {
    $utils: utilsInterface;
    WALLET_CONFIG: WalletConfigInterface;
    globalData: globalDataInterface;
  }
}

Vue.prototype.WALLET_CONFIG = WALLET_CONFIG;
Vue.prototype.$utils = utils;

Vue.component('u-title', uTitle);
Vue.component('u-body', uBody);
Vue.component('u-tabbar', uTabbar);
Vue.component('u-input', uInput);
Vue.component('tki-qrcode', tkiQrcode);

new App().$mount()
