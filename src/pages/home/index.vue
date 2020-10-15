<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 10:06:22
 * @FilePath /wallet/src/pages/home/index.vue
-->
<template>
  <div>
    <u-title v-bind:title="value"></u-title>
    <u-body v-bind:bottom="56">
      <!-- <u-wallet></u-wallet> -->
    </u-body>
    <u-tabbar :list="tabbar" :value="value" @chose="loadPage"></u-tabbar>
  </div>
</template>
<script>
import uWallet from "@/pages/index/index";

import Vue from "vue";

export default Vue.extend({
  name: "home",
  components: {
    uWallet,
  },
  data() {
    return {
      value: "资产",
      tabbar: [
        {
          title: "资产",
          value: "资产",
          icon: "wallet",
        },
        {
          title: "我的",
          value: "我的",
          icon: "mine",
        },
      ],
    };
  },
  methods: {
    loadPage(e) {
      this.value = e.value;
    },
  },
});
</script>
