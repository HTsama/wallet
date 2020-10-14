<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-13 20:13:27
 * @FilePath /wallet-ts/src/pages/index/index.vue
-->
<template>
  <div>
    <u-title></u-title>
    <view class="content">
      <view class="view-group">
        <view class="view-title">
          <p>创建你的</p>
          <p>第一个数字钱包</p>
        </view>
        <view class="btn-view-group">
          <view class="btn-view primary">
            <button class="btn-default" hover-class="btn-hover" @click="goPage">
              创建钱包
            </button>
          </view>
          <view class="btn-view">
            <button class="btn-default" hover-class="btn-hover">
              导入钱包
            </button>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    goPage() {
      uni.navigateTo({
        url: "../creat/index",
        fail(err) {
          console.log(err);
        },
      });
    },
  },
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
}
.view-title {
  width: 690upx;
  height: 300upx;
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
  height: 230upx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}
.btn-view {
  width: 690upx;
  height: 100upx;
  border-radius: 8upx;
  color: #2a7cff;
}
button::after {
  border: none;
}
.btn-default {
  border: none;
}
.btn-view .btn-default {
  color: #2a7cff;
  background: #f5f5f5;
  border-radius: 50upx;
}
.btn-view.primary .btn-default {
  color: #fff;
  background: #2a7cff;
}
.btn-hover {
  opacity: 0.8;
}
</style>
