<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 10:06:22
 * @FilePath /wallet/src/pages/home/index.vue
-->
<template>
  <div>
    <u-title v-bind:title="value.value == 'mine' ? value.title : ''">
      <code>
        <div
          class="home-title"
          v-if="wallet.length > 0 && value.value != 'mine'"
        >
          <div class="logo">
            <image src="../../static/logo.png" mode="aspectFit" />
          </div>
          <div class="title-btn">
            <div class="u-add iconfont" @click="goPage('import')"></div>
          </div>
        </div>
      </code>
    </u-title>
    <u-body
      v-bind:scroll="true"
      v-bind:bottom="56"
      v-bind:load="load"
      @onRefresh="onRefresh"
    >
      <u-wallet
        v-show="value.value == 'wallet'"
        ref="wallet"
        v-bind:status="status"
      ></u-wallet>
      <u-mine v-show="value.value == 'mine'"></u-mine>
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
  wallet = [];
  load = true;
  value = {
    title: "资产",
    value: "wallet",
    icon: "wallet",
  };
  status = 0;
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
  onRefresh(e: any) {
    this.load = false;
    setTimeout(() => {
      this.$nextTick(() => {
        this.load = true;
      });
    }, 500);
  }
  goPage(type: string) {
    uni.navigateTo({
      url: "../creat/index?type=" + type,
    });
  }
  beforeCreate() {
    console.log(this.WALLET_CONFIG);
  }
  onShow() {
    this.wallet = uni.getStorageSync("wallet");
    if ((this as any).$refs.wallet && this.value.value == "wallet") {
      if (this.wallet.length > 0) {
        this.status = 1;
        (this as any).$refs.wallet.init();
      }
    }
  }
  mounted() {
    this.wallet = uni.getStorageSync("wallet");
    if (this.wallet.length > 0) {
      this.status = 1;
      (this as any).$refs.wallet.init();
    }
  }
  loadPage(e: any) {
    this.$isServer;
    this.value = this.$utils.getObj(this.tabbar, "value", e.value);
    if (this.value.value == "wallet") {
      (this as any).$refs.wallet.init();
      if (this.wallet.length > 0) {
        this.status = 1;
      }
    }
  }
}
</script>
<style lang="scss">
.title-btn .u-add {
  font-size: 48upx;
  color: $main-color;
}
.logo {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.logo image {
  width: 50%;
  height: 50%;
}
.home-title {
  display: flex;
  width: calc(750upx - 60upx);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 30upx;
}
</style>
