<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-13 23:13:27
 * @FilePath /wallet-ts/src/pages/creat/index.vue
-->
<template>
  <view class="content">
    <view class="view-group">
      <view class="view-title">
        <p>创建钱包</p>
        <view class="list-view">
          以太坊
          <image
            class="list-image"
            :src="require('../../static/home/yt.png')"
            mode="heightFix"
          />
        </view>
        <view class="list-view">
          比特币
          <image
            class="list-image"
            :src="require('../../static/home/bt.png')"
            mode="heightFix"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      title: "",
    };
  },
  onLoad() {},
  methods: {},
});
</script>

<style>
page {
  background: #ffffff;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-image {
  height: 100upx;
}
.view-group {
  width: 750upx;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.view-title {
  width: 690upx;
  height: 600upx;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: flex-start;
}
.view-title p {
  color: #2a7cff;
  font-size: 64upx;
}
.btn-view-group {
  width: 750upx;
  height: 100upx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.btn-hover {
  opacity: 0.8;
}
.list-view {
  width: 100%;
  height: 200upx;
  border-radius: 20upx;
  background: rgba(235, 162, 73, 1);
  margin-top: 30upx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30upx;
  font-size: 42upx;
  flex-direction: row;
  box-sizing: border-box;
  box-shadow: 0 0 20upx rgba(235, 162, 73, 0.5);
}
.list-view:nth-child(2) {
  margin-top: 60upx;
  background: rgba(242, 241, 245, 1);
  box-shadow: 0 0 20upx rgba(242, 241, 245, 0.5);
  color: #333;
}
</style>
