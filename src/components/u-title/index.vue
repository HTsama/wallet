<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet/src/components/u-title/index.vue
-->
<template>
  <div :class="'title-view ' + (theme ? 'theme' : '')">
    {{ title }}
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "u-title",
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
});
</script>
<style lang="scss">
.title-view {
  width: 750upx;
  height: 44px;
  padding-top: var(--status-bar-height);
  background: #fff;
  display: flex;
  color: #333;
  font-size: 38upx;
  align-items: center;
  justify-content: center;
}
.title-view.theme {
  background: $main-color;
  color: #fff;
}
</style>
