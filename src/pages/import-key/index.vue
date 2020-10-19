<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-16 12:16:52
 * @FilePath /wallet/src/pages/import-key/index.vue
-->
<template>
  <div>
    <u-title :title="title" :theme="false"></u-title>
    <u-body>
      <div class="view-group">
        <div class="view-title">
          <p>私钥</p>
          <p>导入钱包</p>
        </div>
        <div class="form-group">
          <div class="form-list-view">
            <u-input
              title="钱包名"
              name="name"
              placeholder="请输入钱包名"
              @changevalue="changevalue"
            />
          </div>
          <div class="form-list-view">
            <u-input
              title="密码"
              name="password"
              typeName="password"
              placeholder="密码不能少于8位"
              @changevalue="changevalue"
            />
          </div>
          <div class="form-list-view">
            <u-input
              title="再次输入密码"
              name="againpassword"
              typeName="password"
              placeholder="请再次输入密码"
              @changevalue="changevalue"
            />
          </div>
          <div class="form-list-view">
            <u-input
              title="密码提示"
              name="tips"
              placeholder="请输入密码提示，可不填"
              @changevalue="changevalue"
            />
          </div>
          <div class="form-list-view">
            <u-input
              title="私钥"
              name="key"
              placeholder="请输入私钥"
              @changevalue="changevalue"
            />
          </div>
        </div>
        <div class="btn-group">
          <div class="btn-view primary">
            <button
              class="btn-default"
              hover-class="btn-hover"
              @click="creat()"
            >
              创建钱包
            </button>
          </div>
        </div>
      </div>
    </u-body>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { DatoWalletService } from "../../service/index";

@Component()
export default class ImportKey extends Vue {
  title = "私钥导入";
  DatoWallet = {};
  walletInfo = {};
  localwallet = [];
  form = {};
  bottom = 0;
  type = 0;
  onLoad(options) {
    this.type = options.type;
    this.DatoWallet = new DatoWalletService(
      this.WALLET_CONFIG[this.type].ip,
      this.WALLET_CONFIG[this.type].id
    );
    this.localwallet = uni.getStorageSync("wallet");
  }
  changevalue(e) {
    this.form[e.name] = e.value;
  }
  changekey(e) {
    this.bottom = e;
  }
  creat() {
    if (!this.form.name || this.form.name == "") {
      uni.showToast({
        title: "请输入钱包名",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (!this.form.password || this.form.password == "") {
      uni.showToast({
        title: "请输入密码",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (this.form.password.length < 8) {
      uni.showToast({
        title: "密码不能少于8位",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (
      !this.form.againpassword ||
      this.form.againpassword == "" ||
      (!this.form.againpassword != this.form.password) == ""
    ) {
      uni.showToast({
        title: "密码不一致",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (this.form.key == "") {
      uni.showToast({
        title: "请输入私钥",
        icon: "none",
        duration: 2000,
      });
      return;
    } else {
      this.walletInfo = this.DatoWallet.importWalletFromPrivateKey(
        this.form.key
      );
      if (!this.localwallet) {
        this.localwallet = [];
      }
      this.localwallet = [
        ...this.localwallet,
        ...[
          {
            info: {
              name: this.form.name,
              password: this.form.password,
              tips: this.form.tips,
              type: this.type,
            },
            wallet: this.walletInfo,
          },
        ],
      ];
      uni.setStorageSync("wallet", this.localwallet);
      uni.navigateBack({
        delta: 3,
      });
    }
  }
}
</script>

<style>
.btn-group {
  position: fixed;
  bottom: 30upx;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
.form-group {
  display: flex;
  margin-top: 30upx;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30upx;
  flex-direction: column;
  justify-content: flex-start;
}
.view-group {
  justify-content: flex-start;
  transition: 0.25s;
}
.form-list-view {
  width: 100%;
  padding-bottom: 20upx;
}
</style>
