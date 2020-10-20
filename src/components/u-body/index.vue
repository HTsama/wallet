<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet/src/components/u-body/index.vue
-->
<template>
  <movable-area
    :style="{
      height:
        phoneInfo.screenHeight -
        top -
        bottom -
        phoneInfo.safeAreaInsets.bottom -
        phoneInfo.statusBarHeight +
        45 +
        'px',
      width: '750upx',
      marginTop: 44 + phoneInfo.statusBarHeight + 'px',
    }"
  >
    <movable-view
      :damping="50"
      :out-of-bounds="true"
      :y="y"
      :disabled="isLoad == 3"
      direction="vertical"
      @touchend="touchend"
      @change="touchMove"
      :style="{
        width: '750upx',

        height:
          phoneInfo.screenHeight -
          top -
          bottom -
          phoneInfo.safeAreaInsets.bottom -
          phoneInfo.statusBarHeight +
          'px',
      }"
    >
      <scroll-view
        scroll-y
        :class="'body-view ' + (bottom == 0 ? 'bottom' : '')"
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
      </scroll-view>
    </movable-view>
  </movable-area>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  props: {
    load: {
      type: Boolean,
      default: true,
    },
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
})
export default class UBody extends Vue {
  name = "u-body";
  scrollTop = 0;
  phoneInfo = this.globalData;
  // 1下拉刷新 2松开刷新 3加载中 4加载完成
  isLoad = 4;
  threshold = 45;
  y = 0;
  @Watch("load")
  onChangeValue(newVal: Boolean) {
    this.$nextTick(() => {
      this.y = newVal ? -45 : 0;
      this.isLoad = newVal ? 1 : 3;
    });
  }
  touchend() {
    if (this.isLoad >= 3) {
    }
    if (this.isLoad == 2) {
      this.isLoad = 3;
      this.y = 0;
      this.$emit("onRefresh");
    } else if (this.isLoad == 1) {
      this.y = 0;
      this.$nextTick(() => {
        this.y = -45;
        this.isLoad = 4;
      });
    }
  }
  touchMove(e: any) {
    if (this.isLoad >= 3) {
    }
    if (e.detail.y > this.threshold) {
      this.isLoad = 2;
    } else {
      this.isLoad = 1;
    }
  }
}
</script>
<style lang="scss">
.body-view {
  width: 750upx;
  box-sizing: border-box;
}
.body-view.screen {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
.load-view {
  width: 100%;
  height: 100%;
  color: #333;
}
</style>
