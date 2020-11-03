<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-11-03 19:34:24
 * @FilePath /wallet/src/pages/pay/index.vue
-->
<template>
  <div class="vc">
    <u-title title="转账" :theme="false"></u-title>
    <u-body>
      <div class="card-more">
        <div class="card-more-list">
          <div class="card-list-icon pay"></div>
          直接转账
        </div>
        <div class="card-more-list">
          <div class="card-list-icon cq"></div>
          扫码转账
        </div>
      </div>
    </u-body>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DatoWalletService } from "../../service/web3";

@Component
export default class Pay extends Vue {
  DatoWallet: any = {};
  onLoad(options: any) {
    this.init();
  }
  init() {
    // this.DatoWallet = new DatoWalletService(this.WALLET_CONFIG["DETO"].ip);
    // this.DatoWallet.transaction(
    //   "0x857eF46Cd9609Fb4098353a64F62Cfd99Be67266",
    //   "0xa0E1F40b1E30f4bAf5678aa7e41d9Fb3e1572212",
    //   "0xc6e412e3a9ca838fa297241bdae3ab21e148571d7d2a9e316a60dd7813f45e9a",
    //   "10"
    // );
  }
}
</script>

<style lang="scss">
.vc {
  height: 100vh;
  width: 100%;
  background: #f5f5f5;
  overflow: hidden;
}
.card-more {
  width: calc(100% - 60upx);
  box-sizing: border-box;
  margin: 30upx 30upx;
  display: flex;
  flex-direction: row;
  border-radius: 20upx;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  justify-content: space-between;
}
.card-more .card-more {
  width: 100%;
  margin: 0;
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
.card-list-icon {
  width: 100upx;
  border-radius: 100%;
  background-size: auto 75% !important;
  height: 100upx;
}
</style>
