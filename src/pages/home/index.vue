<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 10:06:22
 * @FilePath /wallet/src/pages/home/index.vue
-->
<template>
  <div>
    <u-title
      v-bind:title="value.value == 'mine' ? value.title : ''"
      :theme="value.value == 'mine' ? true : false"
    ></u-title>
    <u-body v-bind:bottom="56">
      <u-wallet v-if="value.value == 'wallet'"></u-wallet>
      <u-mine v-if="value.value == 'mine'"></u-mine>
    </u-body>
    <u-tabbar :list="tabbar" :value="value.value" @chose="loadPage"></u-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import uWallet from "@/pages/index/index.vue";
import uMine from "@/pages/mine/index.vue";

@Component({
  components: {
    "u-wallet": uWallet,
    "u-mine": uMine,
  },
})
export default class Home extends Vue {
  value = {
    title: "资产",
    value: "wallet",
    icon: "wallet",
  };
  tabbar = [
    {
      title: "资产",
      value: "wallet",
      icon: "wallet",
    },
    {
      title: "我的",
      value: "mine",
      icon: "mine",
    },
  ];
  beforeCreate() {
    console.log(this.WALLET_CONFIG);
  }
  loadPage(e: any) {
    this.$isServer;
    this.value = this.$utils.getObj(this.tabbar, "value", e.value);
  }
}
</script>
