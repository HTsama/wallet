<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-13 20:13:27
 * @FilePath /wallet/src/pages/index/index.vue
-->
<template>
  <div class="view-group">
    <div class="view-title">
      <p>创建你的</p>
      <p>第一个数字钱包</p>
    </div>
    <div class="bg">
      <image src="../../static/home/home-bg.png" mode="aspectFit" />
    </div>
    <div class="btn-view-group">
      <div class="btn-view primary">
        <button class="btn-default" hover-class="btn-hover" @click="goPage">
          创建钱包
        </button>
      </div>
      <div class="btn-view">
        <button class="btn-default" hover-class="btn-hover">
          导入钱包
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import uWallet from "@/pages/index/index.vue";

@Component
export default class extends Vue {
  name = "u-wallet";
  localwallet = [];
  beforeCreate() {
    this.localwallet = uni.getStorageSync("wallet");
    console.log(this.localwallet);
  }
  goPage() {
    uni.navigateTo({
      url: "../creat/index",
    });
  }
}
</script>

<style>
page {
  background: #ffffff;
}
.bg {
  width: 600upx;
  height: 500upx;
}
.bg image {
  width: 100%;
  margin-top: 50upx;
}
.btn-view-group {
  width: 750upx;
  height: 230upx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}
</style>
