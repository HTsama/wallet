<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 13:29:44
 * @FilePath /wallet/src/components/u-tabbar/index.vue
-->
<template>
  <div class="tabbar-view">
    <div
      class="tabbar-list"
      v-for="(item, index) in list"
      v-bind:key="index"
      @click="itemChose(item)"
    >
      <div
        :class="
          item.icon + ' tabbar-icon ' + (value == item.value ? 'active' : '')
        "
      ></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "u-tabbar",
  props: {
    list: {
      type: Array,
      default: [],
    },
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    itemChose(e) {
      this.$emit("chose", e);
    },
  },
});
</script>
<style lang="scss">
.tabbar-view {
  width: 750upx;
  height: 56px;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0upx 20upx rgba(0, 0, 0, 0.05);
}
.tabbar-list {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabbar-icon {
  width: 25px;
  height: 25px;
  position: relative;
  transition: 0.25s;
  -webkit-transition: 0.25s;
}
.tabbar-icon.active {
  animation: sc 0.5s forwards;
  -webkit-animation: sc 0.5s forwards;
}
@keyframes sc {
  0% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
