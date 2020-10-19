<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet/src/components/u-body/index.vue
-->
<template>
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
      marginTop: 44 + phoneInfo.statusBarHeight + 'px',
    }"
  >
    <div class="load-view">
      <slot></slot>
    </div>
  </scroll-view>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
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
})
export default class UBody extends Vue {
  name = "u-body";
  scrollTop = 0;
  phoneInfo = this.globalData;
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
