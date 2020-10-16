<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-16 12:16:52
 * @FilePath /wallet/src/pages/creat-form/index.vue
-->
<template>
  <div>
    <u-title :title="title" :theme="false"></u-title>
    <u-body>
      <div class="view-group">
        <div class="view-title">
          <p>创建</p>
          <p>你的钱包</p>
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
import { DatoWallet } from "../../service/index";

@Component()
export default class CreateForm extends Vue {
  title = "创建钱包";
  DatoWallet = {};
  walletInfo = {};
  localwallet = [];
  form = {};
  onLoad(options) {
    this.DatoWallet = new DatoWallet(
      this.WALLET_CONFIG[options.type].ip,
      this.WALLET_CONFIG[options.type].id
    );
    this.localwallet = uni.getStorageSync("wallet");
  }
  changevalue(e) {
    this.form[e.name] = e.value;
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
    } else {
      this.walletInfo = this.DatoWallet.createWallet();
      if (!this.localwallet) {
        this.localwallet = [];
      }
      console.log(this.localwallet);
      this.localwallet = [
        ...this.localwallet,
        ...[
          {
            info: {
              name: this.form.name,
              password: this.form.password,
              tips: this.form.tips,
            },
            wallet: this.walletInfo,
          },
        ],
      ];
      uni.setStorage({
        key: "wallet",
        data: this.localwallet,
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
