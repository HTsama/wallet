<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-18 22:39:17
 * @FilePath /wallet/src/pages/import-fun/index.vue
-->
<template>
  <div>
    <u-title title="" :theme="false"></u-title>
    <u-body>
      <div class="view-group">
        <div class="view-title">
          <p>选择</p>
          <p>导入方式</p>
        </div>
        <div class="list-group">
          <view class="list-view" @click="creat('DETO', 'k')">
            <p>私钥</p>
            <div class="list-icon iconfont icon u-key"></div>
          </view>
          <view class="list-view" @click="creat('DETO', 'c')">
            <p>助记词</p>
            <div class="list-icon iconfont icon u-abc"></div>
          </view>
          <view class="list-view" @click="creat('DETO', 'j')">
            <p>Keystore</p>
            <div class="list-icon iconfont icon u-json"></div>
          </view>
        </div>
      </div>
    </u-body>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component()
export default class ImportFun extends Vue {
  title = "选择导入方式";
  creat(e, f) {
    if (f != "k") {
      uni.showToast({
        title: "暂未开放",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    uni.navigateTo({
      url: "../import-key/index?type=" + e,
    });
  }
  onLoad(options) {
    this.type = options.type;
  }
}
</script>

<style>
.list-image {
  width: 170upx;
  height: 110upx;
}
.list-group {
  display: flex;
  margin-top: 60upx;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30upx;
  flex-direction: row;
  justify-content: space-between;
}
.list-icon {
  font-size: 160upx;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.5);
  margin-right: -40upx;
  margin-bottom: -40upx;
}
.view-group {
  justify-content: flex-start;
}
.list-view {
  width: 210upx;
  height: 210upx;
  border-radius: 16upx;
  background: linear-gradient(to right bottom, #7983ff 10%, #2d7afe);
  margin-top: 30upx;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 42upx;
  flex-direction: row;
  box-sizing: border-box;
  box-shadow: 0 0 10upx rgba(45, 122, 254, 0.25);
  float: left;
  position: relative;
}
.list-view p {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 30upx;
  font-size: 38upx;
}
</style>
