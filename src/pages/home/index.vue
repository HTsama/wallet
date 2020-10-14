<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 10:06:22
 * @FilePath /wallet-ts/src/pages/home/index.vue
-->
<template>
  <div>
    <u-title></u-title>
    <u-body v-bind:bottom="56">
      {{ value }}
    </u-body>
    <u-tabbar :list="tabbar" :value="value" @chose="loadPage"></u-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      value: "wallet",
      tabbar: [
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
      ],
    };
  },
  onLoad() {},
  methods: {
    loadPage(e) {
      this.value = e.icon;
    },
  },
});
</script>
