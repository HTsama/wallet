<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet-ts/src/components/u-title/index.vue
-->
<template>
  <div class="title-view">
    标题
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
  },
});
</script>
<style lang="scss">
.title-view {
  width: 750upx;
  height: 44px;
  padding-top: var(--status-bar-height);
  background: $main-color;
  display: flex;
  color: #fff;
  font-size: 32upx;
  align-items: center;
  justify-content: center;
}
</style>
