<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet/src/components/u-title/index.vue
-->
<template>
  <div :class="'title-view ' + (theme ? 'theme' : '')">
    <div class="back u-arrow-left iconfont" v-if="back" @click="goBack"></div>
    {{ title }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  props: {
    title: {
      type: String,
      default: "",
    },
    bg: {
      type: String,
      default: "",
    },
    theme: {
      type: Boolean,
      default: false,
    },
  },
})
export default class UTitle extends Vue {
  back = false;
  mounted() {
    if (getCurrentPages().length > 1) {
      this.back = true;
    }
  }
  goBack() {
    uni.navigateBack({});
  }
}
</script>
<style lang="scss">
.title-view {
  width: 750upx;
  height: 44px;
  padding-top: var(--status-bar-height);
  background: #fff;
  display: flex;
  font-size: 38upx;
  align-items: center;
  justify-content: center;
  color: $main-color;
  position: relative;
  z-index: 1;
  position: fixed;
  top: 0;
}
.title-view.theme {
  background: $main-color;
  color: #fff;
}
.back {
  position: absolute;
  left: 0;
  top: 0;
  width: 44px;
  height: 44px;
  display: flex;
  padding-top: var(--status-bar-height);
  justify-content: center;
  align-items: center;
  color: $main-color;
}
.theme .back {
  color: #fff;
}
</style>
