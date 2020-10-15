<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet/src/components/u-body/index.vue
-->
<template>
  <div
    :class="'body-view ' + bottom == 0 ? 'bottom' : ''"
    :style="{
      height:
        phoneInfo.screenHeight -
        top -
        bottom -
        phoneInfo.safeAreaInsets.bottom -
        phoneInfo.statusBarHeight +
        'px',
    }"
  >
    <div class="load-view">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "u-body",
  props: {
    top: {
      type: Number,
      default: 44,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    home: {
      type: Boolean,
      default: false,
    },
  },
  beforeCreate() {
    this.phoneInfo = getApp().globalData.phoneInfo;
    console.log(getApp().globalData.phoneInfo);
  },
  created() {},
});
</script>
<style lang="scss">
.body-view {
  width: 750upx;
  background: #f8f8f8;
  box-sizing: border-box;
}
.body-view.screen {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
.load-view {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}
</style>
