<template>
  <view class="content">
    <div>钱包信息：{{ walletInfo.address }}</div>
    <div>余额：{{ balance }}</div>
    <div>助记词：{{ mnemonic }}</div>
    <button @click="handleCreateWallet()" style="margin-bottom: 10px">
      随机创建钱包
    </button>
    <button @click="handleCreateWallet('Mnemonic')" style="margin-bottom: 10px">
      助记词创建钱包
    </button>
    <button
      @click="handleCreateWallet('PrivateKey')"
      style="margin-bottom: 10px"
    >
      私钥创建钱包
    </button>

    <button @click="handleQueryBalance">查询余额</button>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DatoWallet } from "../../service/index";

@Component
export default class Mine extends Vue {
  balance = "0"; // 余额
  mnemonic = ""; // 助记词
  DatoWallet = new DatoWallet("http://118.190.100.235:8545", 19851111); // DATO钱包对象
  walletInfo = {}; // 当前钱包信息
  handleCreateWallet(action: any) {
    if (!action) {
      this.walletInfo = this.DatoWallet.createWallet();
      console.log(this.walletInfo);
    }
    if (action === "Mnemonic") {
      // 随机生成助记词
      const m = "";
      this.mnemonic = m;
      this.walletInfo = this.DatoWallet.createWalletFromMnemonic(m);
    }
    if (action === "PrivateKey") {
      // 根据私钥
      const privateKey = "";
      this.walletInfo = this.DatoWallet.createWalletFromPrivateKey(privateKey);
    }
  }
  handleQueryBalance() {
    this.DatoWallet.getBalance().then((balance: string) => {
      if (balance) {
        this.balance = balance;
      }
    });
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
