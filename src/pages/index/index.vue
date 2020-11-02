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
      <swiper
        class="swiper card-g"
        :indicator-dots="true"
        :current="walletIndex"
        @change="changeIndex"
        indicator-color="rgba(42,124,255,0.5)"
        indicator-active-color="#2a7cff"
      >
        <swiper-item
          class="sw-list"
          v-for="(item, index) in localwallet"
          v-bind:key="index"
        >
          <div class="card">
            <p>我的资产</p>
            <div class="my-address" @click="copy(index)">
              {{ walletAny[index].address }}
              <div class="copy u-copy iconfont"></div>
            </div>
            <p>
              {{ walletAny[index].balance }}
              <span>{{ localwallet[index].info.type }}</span>
            </p>
            <div class="card-bg">
              <image
                :src="
                  '../../static/home/card/' +
                    localwallet[index].info.type +
                    '.png'
                "
                mode="aspectFit"
              />
            </div>
            <div class="card-bg-round"></div>
            <div class="more" @click="goPage('wallet')">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </swiper-item>
      </swiper>
      <div class="card-more">
        <div class="card-more-list">
          <div class="card-list-icon wl" @click="goUrl('../demo/index')"></div>
          钱包
        </div>
        <div class="card-more-list">
          <div class="card-list-icon txl"></div>
          地址簿
        </div>
        <div class="card-more-list">
          <div class="card-list-icon zz"></div>
          转账
        </div>
        <div class="card-more-list">
          <div class="card-list-icon sk"></div>
          收款
        </div>
      </div>
      <div
        style="width: 100%;"
        v-for="(item, index) in moneyArr"
        v-bind:key="index"
      >
        <div class="card-more" v-show="item.money != 0">
          <div class="card-title">
            <div class="card-icon">
              <image
                :src="'../../static/home/logo/' + item.title + '.png'"
                mode="aspectFit"
              />
            </div>
            {{ item.title }}
          </div>
          <div class="card-money">{{ item.money }}</div>
        </div>
      </div>
      <tki-qrcode
        :loadMake="true"
        val="0x0697f327eBc6D0EDC820BA0bac2a89D2EEC03C0b"
        @result="qrR"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { DatoWalletService } from "../../service/index";
import uWallet from "@/pages/index/index.vue";
@Component({
  props: {
    status: {
      type: Number,
      default: 0,
    },
  },
})
export default class extends Vue {
  name = "u-wallet";
  localwallet: Array<any> = [];
  walletIndex = 0;
  walletAny: any = [];
  moneyArr: any = [
    {
      title: "ETH",
      money: 0,
    },
    {
      title: "DETO",
      money: 0,
    },
  ];
  qrR(e: any) {
    console.log(e);
  }
  async init() {
    this.localwallet = uni.getStorageSync("wallet");
    this.walletIndex = uni.getStorageSync("walletIndex");
    if (!this.walletIndex) {
      this.walletIndex = 0;
      uni.setStorageSync("walletIndex", this.walletIndex);
    }
    if ((this as any).localwallet != "") {
      this.localwallet.forEach(async (item, index) => {
        let that = this;
        that.walletAny.push({
          //余额
          balance: "0.0",
          address: "",
          type: "",
        });
        await that.handleQueryBalance(index);
        if (item.info.type == "DETO") {
          this.$set(
            that.moneyArr[1],
            "money",
            that.moneyArr[1].money + Number(await that.balanceAdd(index))
          );
        } else if (item.info.type == "ETH") {
          this.$set(
            that.moneyArr[0],
            "money",
            that.moneyArr[0].money + Number(await that.balanceAdd(index))
          );
        }
      });
    }
  }
  copy(index: number) {
    uni.setClipboardData({
      data: this.localwallet[index].wallet.address,
    });
    uni.showToast({
      title: "复制钱包地址成功",
      icon: "none",
      duration: 2000,
    });
  }
  changeIndex(e: any) {
    uni.setStorageSync("walletIndex", e.detail.current);
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
  async handleQueryBalance(index: number) {
    const creatTyp: "DETO" | "ETH" = this.localwallet[index].info.type;
    const creatIp: string = this.WALLET_CONFIG[creatTyp].ip;
    this.$set(
      this.walletAny[index],
      "balance",
      await this.$utils.getBalance(
        creatIp,
        this.localwallet[index].wallet.address
      )
    );
    this.walletAny[index].type = creatTyp;
    this.walletAny[index].address =
      this.localwallet[index].wallet.address.substring(0, 5) +
      "******" +
      this.localwallet[index].wallet.address.substring(37, 42);
  }
  async balanceAdd(index: number) {
    const creatTyp: "DETO" | "ETH" = this.localwallet[index].info.type;
    const creatIp: string = this.WALLET_CONFIG[creatTyp].ip;
    return await this.$utils.getBalance(
      creatIp,
      this.localwallet[index].wallet.address
    );
  }
  goPage(type: string) {
    if (type == "wallet") {
      uni.navigateTo({
        url: "../wallet-setting/index",
      });
    } else {
      uni.navigateTo({
        url: "../creat/index?type=" + type,
      });
    }
  }
  goUrl(e: string) {
    uni.navigateTo({
      url: e,
    });
  }
}
</script>

<style lang="scss">
.card-title {
  width: 240upx;
  height: 120upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28upx;
  color: #333;
}
.card-money {
  width: auto;
  height: 120upx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30upx;
  color: #333;
  font-size: 28upx;
}
.card-icon {
  width: 60upx;
  height: 60upx;
  margin: 30upx;
  background: #f1f1f1;
  opacity: 0.7;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-icon image {
  width: 50%;
  height: 50%;
}
.card-list-icon {
  width: 100upx;
  border-radius: 100%;
  background-size: auto 75% !important;
  height: 100upx;
}
.copy {
  color: #fff;
  font-size: 32upx;
  margin-left: 5upx;
  width: 50upx;
  height: 50upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-bg-round {
  width: 500upx;
  height: 500upx;
  background: rgba(255, 255, 255, 0.1);
  right: -200upx;
  top: -180upx;
  position: absolute;
  border-radius: 300upx;
}
.more {
  position: absolute;
  right: 0upx;
  top: 0upx;
  height: 100upx;
  padding-right: 10upx;
  padding-bottom: 30upx;
  padding-top: 30upx;
  box-sizing: border-box;
  width: 60upx;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.more span {
  width: 8upx;
  height: 8upx;
  background: #fff;
  border-radius: 5upx;
}
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
.my-address {
  font-size: 26upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  margin: 10upx 30upx 20upx 30upx;
}
.chose {
  color: #fff;
  font-size: 24upx;
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
.card-g {
  width: 750upx;
  height: 400upx;
}
.card {
  width: 690upx;
  position: relative;
  margin-top: 30upx;
  margin-left: 30upx;
  height: 300upx;
  border-radius: 20upx;
  background: linear-gradient(to right bottom, $main-color, $main-color-opac);
}
.card p {
  color: #fff;
  font-size: 32upx;
  padding: 30upx 30upx 30upx 30upx;
}
.card p:nth-child(3) {
  font-size: 48upx;
  font-weight: bold;
}
.card-bg {
  width: 100upx;
  height: 100upx;
  position: absolute;
  right: 30upx;
  bottom: 30upx;
}
.card-bg image {
  width: 100%;
  height: 100%;
}
.view-group.card-view {
  justify-content: flex-start;
  background: #f5f5f5;
}
.card p span {
  font-size: 32upx;
  margin-left: 20upx;
}
.card-more {
  width: calc(100% - 60upx);
  box-sizing: border-box;
  margin: 10upx 30upx;
  display: flex;
  flex-direction: row;
  border-radius: 20upx;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  justify-content: space-between;
}
.card-more-list {
  flex: 1;
  height: 210upx;
  border-radius: 16upx;
  font-size: 26upx;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  float: left;
  position: relative;
}
.card-more-list:last-child::after {
  display: none;
}
</style>
