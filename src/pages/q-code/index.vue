<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-11-02 19:09:28
 * @FilePath /wallet/src/pages/q-code/index.vue
-->
<template>
  <div style="height: 100vh;background: #2a7cff;">
    <u-title title="收款" :theme="true"></u-title>
    <u-body>
      <div class="con">
        <div class="card">
          <p>扫一扫，向我支付</p>
          <tki-qrcode
            :size="300"
            :loadMake="true"
            :val="wallet.wallet.address"
          />
          <div class="my-address-line">复制收款地址</div>
          <div class="my-address" @click="copy">
            {{ wallet.wallet.copyAddress }}
            <div class="copy u-copy iconfont"></div>
          </div>
        </div>
      </div>
    </u-body>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QCode extends Vue {
  wallet: any = {};
  onLoad(options: any) {
    this.wallet = JSON.parse(options.wallet);
    this.wallet.wallet.copyAddress =
      this.wallet.wallet.address.substring(0, 15) +
      "******" +
      this.wallet.wallet.address.substring(27, 42);
  }
  copy() {
    uni.setClipboardData({
      data: this.wallet.wallet.address,
    });
    uni.showToast({
      title: "复制钱包地址成功",
      icon: "none",
      duration: 2000,
    });
  }
}
</script>

<style lang="scss">
.con {
  width: 100%;
  height: 100%;
  background: $main-color;
  overflow: hidden;
}
.card {
  width: 690upx;
  height: 700upx;
  margin: 0 30upx 30upx 30upx;
  border-radius: 20upx;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
}
.dt {
  font-size: 28upx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100upx;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.card p {
  font-size: 30upx;
  margin: 60upx auto;
}
.my-address {
  color: $main-color;
  font-size: 28upx;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: calc(100% - 60upx);
  align-items: center;
}
.my-address-line {
  font-size: 30upx;
  color: #333;
  border-top: 1px solid #efefef;
  height: 80upx;
  display: flex;
  align-items: center;
  padding-top: 15upx;
  width: calc(100% - 60upx);
  margin-top: 50upx;
}
.copy {
  margin-left: 10upx;
}
</style>
