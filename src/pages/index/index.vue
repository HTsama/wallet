<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-13 20:13:27
 * @FilePath /wallet/src/pages/index/index.vue
-->
<template>
  <div class="v-g">
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
          <button
            class="btn-default"
            hover-class="btn-hover"
            @click="goPage('creat')"
          >
            创建钱包
          </button>
        </div>
        <div class="btn-view">
          <button
            class="btn-default"
            hover-class="btn-hover"
            @click="goPage('import')"
          >
            导入钱包
          </button>
        </div>
      </div>
    </div>
    <div class="view-group card-view" v-if="status == 1">
      <div class="card">
        <p>我的资产</p>
        <p>
          {{ balance }}<span>{{ localwallet[walletIndex].info.type }}</span>
        </p>
        <div class="card-bg">
          <image
            :src="
              '../../static/home/card/' +
                localwallet[walletIndex].info.type +
                '.png'
            "
            mode="aspectFit"
          />
        </div>
        <div class="card-more">
          <div class="card-more-list">
            转账
          </div>
          <div class="card-more-list">
            收款
          </div>
        </div>
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
  localwallet: Array<any> = [];
  walletIndex = 0;
  // 钱包状态
  status = 0;
  //余额
  balance = "0.0";
  init() {
    this.localwallet = uni.getStorageSync("wallet");
    this.walletIndex = uni.getStorageSync("walletIndex");
    if (this.localwallet.length > 0) {
      this.status = 1;
    }
    if (!this.walletIndex) {
      this.walletIndex = 0;
      uni.setStorageSync("walletIndex", this.walletIndex);
    }
    const DatoWallet = this.creatServe();
    if (DatoWallet) {
      this.handleQueryBalance(DatoWallet);
    }
  }
  // 创建服务
  creatServe() {
    if (this.localwallet) {
      const creatTyp: "DETO" | "ETH" = this.localwallet[this.walletIndex].info
        .type;
      const creatIp: string = this.WALLET_CONFIG[creatTyp].ip;
      const creatId: number = Number(this.WALLET_CONFIG[creatTyp].id);
      return new DatoWalletService(creatIp, creatId);
    } else {
      return false;
    }
  }
  // 获取余额
  async handleQueryBalance(DatoWallet: DatoWalletService) {
    const creatTyp: "DETO" | "ETH" = this.localwallet[this.walletIndex].info
      .type;
    const creatIp: string = this.WALLET_CONFIG[creatTyp].ip;
    this.balance = await this.$utils.getBalance(
      creatIp,
      this.localwallet[this.walletIndex].wallet.address
    );
    console.log(this.balance);
  }
  goPage(type: string) {
    uni.navigateTo({
      url: "../creat/index?type=" + type,
    });
  }
}
</script>

<style lang="scss">
.v-g {
  height: 100%;
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
.card {
  width: 690upx;
  position: relative;
  margin-top: 30upx;
  height: 300upx;
  border-radius: 20upx;
  background: linear-gradient(to right bottom, $main-color, $main-color-opac);
}
.card p {
  color: #fff;
  font-size: 28upx;
  padding: 30upx 30upx 10upx 30upx;
}
.card p:nth-child(2) {
  font-size: 48upx;
  font-weight: bold;
}
.card-bg {
  width: 200upx;
  height: 200upx;
  position: absolute;
  right: 30upx;
  top: 50%;
  margin-top: -100upx;
}
.card-bg image {
  width: 100%;
  height: 100%;
}
.view-group.card-view {
  justify-content: flex-start;
}
.card p span {
  font-size: 32upx;
  margin-left: 20upx;
}
.card-more {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  height: 80upx;
}
.card-more-list {
  font-size: 28upx;
  color: #fff;
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
}
.card-more-list::after {
  position: absolute;
  right: 0;
  width: 2upx;
  height: 26upx;
  top: 50%;
  margin-top: -13upx;
  background: #fff;
  content: "";
}
.card-more-list:last-child::after {
  display: none;
}
</style>
