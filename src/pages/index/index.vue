<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-13 20:13:27
 * @FilePath /wallet/src/pages/index/index.vue
-->
<template>
  <div>
    <div class="view-group" v-if="status == 0">
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
    <div class="view-group" v-if="status == 1">
      <div class="card">
        {{ balance }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DatoWalletService } from "../../service/index";
import uWallet from "@/pages/index/index.vue";

@Component
export default class extends Vue {
  name = "u-wallet";
  localwallet = [];
  walletIndex = 0;
  status = 0;
  balance = "";
  mounted() {
    this.localwallet = uni.getStorageSync("wallet");
    this.walletIndex = uni.getStorageSync("walletIndex");
    if (this.localwallet.length > 0) {
      this.status = 1;
    }
    if (!this.walletIndex) {
      this.walletIndex = 0;
      uni.setStorageSync("walletIndex", this.walletIndex);
    }
    this.handleQueryBalance();
  }
  async handleQueryBalance() {
    const creatTyp: "DETO" = (this as any).localwallet[this.walletIndex].info
      .type;
    const creatIp: string = this.WALLET_CONFIG[creatTyp].ip;
    const creatId: number = Number(this.WALLET_CONFIG[creatTyp].id);
    let DatoWallet = new DatoWalletService(creatIp, creatId);
    this.balance = await DatoWallet.getBalance(
      (this as any).localwallet[this.walletIndex].wallet.address
    );
  }
  goPage() {
    uni.navigateTo({
      url: "../creat/index",
    });
  }
}
</script>

<style lang="scss">
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
.card {
  width: 690upx;
  height: 300upx;
  border-radius: 20upx;
  background: linear-gradient(to right bottom, $main-color, $main-color-opac);
}
</style>
