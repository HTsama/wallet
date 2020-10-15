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
      v-bind:title="value.title"
      :theme="value.value == 'mine' ? true : false"
    ></u-title>
    <u-body v-bind:bottom="56">
      <u-wallet v-if="value.value == 'wallet'"></u-wallet>
    </u-body>
    <u-tabbar :list="tabbar" :value="value.value" @chose="loadPage"></u-tabbar>
  </div>
</template>
<script lang="ts">
// import Vue from "vue";
// import Component from "vue-class-component";
// import { Component } from "vue-property-decorator";
import { Component, Vue, Inject, Provide } from "vue-property-decorator";

import uWallet from "@/pages/index/index.vue";

@Component
export default class extends Vue {
  value = "wallet";
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
  loadPage(e: any) {
    this.$;
    // console.log(this.$utils);
    // this.value = this.$utils.getObj(this.tabbar, "value", e.value);
  }
}
</script>
