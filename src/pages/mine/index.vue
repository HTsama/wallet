<template>
  <div class="content">
    <div class="content-g">
      <div
        class="content-list"
        v-for="(item, index) in listA"
        v-bind:key="index"
      >
        <div class="content-icon">
          <image :src="item.icon" mode="aspectFit" />
        </div>
        <div class="content-font">
          <span>{{ item.title }}</span>
          <div class="back u-arrow-left iconfont"></div>
        </div>
      </div>
    </div>
    <div class="content-g">
      <div
        class="content-list"
        v-for="(item, index) in listB"
        v-bind:key="index"
      >
        <div class="content-icon">
          <image :src="item.icon" mode="aspectFit" />
        </div>
        <div class="content-font">
          <span>{{ item.title }}</span>
          <div class="back u-arrow-left iconfont"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DatoWalletService } from "../../service/index";

@Component
export default class Mine extends Vue {
  listA = [
    {
      title: "钱包管理",
      icon: "../../static/mine/2.png",
    },
    {
      title: "交易记录",
      icon: "../../static/mine/3.png",
    },
    {
      title: "地址簿",
      icon: "../../static/mine/4.png",
    },
  ];
  listB = [
    {
      title: "关于我们",
      icon: "../../static/mine/7.png",
    },
  ];
}
</script>

<style>
.content {
  display: flex;
  align-items: flex-start;
  background: #f5f5f5;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
}
.content-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80upx;
  height: 125upx;
}
.content-icon image {
  width: 50%;
  height: 100%;
}
.content-g {
  width: 690upx;
  height: auto;
  margin: 30upx 30upx 0 30upx;
  background: #fff;
  border-radius: 10upx;
}
.content-font {
  border-bottom: 1px solid #efefef;
  height: 125upx;
  width: calc(100% - 100upx);
  margin-left: 20upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20upx 0 0;
}
.content-font .u-arrow-left {
  transform: rotate(180deg);
  font-size: 26upx;
  color: #999;
}
.content-list:last-child .content-font {
  border-bottom: 0;
}
.content-list {
  width: 100%;
  height: 125upx;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 20upx 0 20upx 20upx;
  font-size: 30upx;
  align-items: center;
}
</style>
