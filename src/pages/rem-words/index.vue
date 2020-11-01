<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-11-01 11:43:41
 * @FilePath /wallet/src/pages/rem-words/index.vue
-->
<template>
  <div>
    <u-title title="" :theme="false"></u-title>
    <u-body v-bind:bottom="bottom">
      <div class="view-group">
        <div class="view-title">
          <p>备份</p>
          <p>助记词</p>
        </div>
        <div class="list-group">
          <p class="tis">
            助记册用于恢复钱包或重置钱包密码，将它准确地抄写在纸上，并存放在只有你知道的安全地方。
          </p>
          <div class="twe-view">
            <div
              class="twe-list"
              v-for="(item, index) in words"
              v-bind:key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="red">
            <p>注意：</p>
            <p>请勿将助记词透露给任何人</p>
            <p>助记词一旦丢失，资产将无法恢复</p>
            <p>请勿通过截屏、网络传输的方式进行备份保存</p>
            <p>遇到任何情况，请不要轻易卸载钱包App</p>
          </div>
        </div>
      </div>
    </u-body>
    <div class="btn-view-group">
      <div class="btn-view primary">
        <button class="btn-default" hover-class="btn-hover" @click="goNext">
          备份完成，进行验证
        </button>
      </div>
      <div class="p" @click="copy">复制助记词</div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component()
export default class RemWords extends Vue {
  title = "备份助记词";
  v = {};
  words = [];
  bottom = 200 / (750 / uni.getSystemInfoSync().windowWidth);

  onLoad(options) {
    this.v = JSON.parse(options.v);
    this.words = this.v.wallet.mnemonic.phrase.split(" ");
    console.log(this.globalData.safeAreaInsets.bottom);
  }
  copy() {
    uni.setClipboardData({
      data: this.v.wallet.mnemonic.phrase,
    });
    uni.showToast({
      title: "复制助记词成功",
      icon: "none",
      duration: 2000,
    });
  }
  goNext() {
    // this.$utils.load();
    uni.navigateTo({
      url: "../edit-words/index?v=" + JSON.stringify(this.v),
    });
  }
}
</script>

<style lang="scss">
.btn-view-group {
  width: 750upx;
  display: flex;
  position: fixed;
  height: 200upx;
  bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.btn-view-group .p {
  font-size: 24upx;
  color: $main-color;
  height: 100upx;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.red {
  margin-top: 10upx;
}
.red p {
  font-size: 26upx;
  color: #c61f1d;
  height: 42upx;
  line-height: 45upx;
}
.view-group {
  justify-content: flex-start;
}
.list-group {
  margin-top: 60upx;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30upx;
}
.tis {
  font-size: 28upx;
  color: #333;
}
.twe-view {
  width: 690upx;
  height: 380upx;
  border-radius: 10upx;
  background: #f5f5f5;
  margin: 30upx 0;
  box-sizing: border-box;
  padding: 20upx 20upx 0 20upx;
  overflow: hidden;
}
.twe-list:nth-child(3n) {
  margin-right: 0;
}
.twe-list {
  width: 200upx;
  background: #fff;
  height: 70upx;
  margin-bottom: 20upx;
  border-radius: 5upx;
  display: flex;
  font-size: 28upx;
  margin-right: 20upx;
  float: left;
  justify-content: center;
  align-items: center;
}
</style>
