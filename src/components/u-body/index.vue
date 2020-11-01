<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 09:25:18
 * @FilePath /wallet/src/components/u-body/index.vue
-->
<template>
  <div>
    <movable-area
      v-if="scroll"
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
        :disabled="isLoad == 3 || !scroll"
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
        <div class="load-icon-view">
          <div class="load-icon" v-if="isLoad == 3">
            <div class="load-icon-list"></div>
            <div class="load-icon-list"></div>
            <div class="load-icon-list"></div>
          </div>
          <div v-if="isLoad != 3" class="load-font">
            <div
              :class="
                'refresh-icon icon iconfont u-refresh ' +
                  (isLoad == 2 ? 'top' : '')
              "
            ></div>
            {{
              isLoad == 1
                ? "下拉刷新"
                : isLoad == 2
                ? "松开刷新"
                : isLoad == 3
                ? "加载中"
                : isLoad == 4
                ? "加载完成"
                : ""
            }}
          </div>
        </div>
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
    <scroll-view
      v-if="scroll == false"
      scroll-y
      :class="'body-view ' + (bottom == 0 ? 'bottom' : '')"
      :style="{
        top: phoneInfo.statusBarHeight + 44 + 'px',
        height:
          phoneInfo.screenHeight -
          top -
          phoneInfo.statusBarHeight -
          bottom -
          phoneInfo.safeAreaInsets.bottom +
          'px',
      }"
    >
      <div class="load-view">
        <slot></slot>
      </div>
    </scroll-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  props: {
    scroll: {
      type: Boolean,
      default: false,
    },
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
  isLoad = 1;
  threshold = 45;
  y = -45;
  @Watch("load")
  onChangeValue(newVal: Boolean, oldVal: Boolean) {
    this.y = newVal ? -45 : 45;
    this.isLoad = newVal ? 1 : 3;
  }
  touchend() {
    if (this.isLoad >= 3) {
      return;
    }
    if (this.isLoad == 2) {
      this.y = 45;
      this.isLoad = 4;
      this.$emit("onRefresh");
    } else if (this.isLoad == 1) {
      this.y = 45;
      this.$nextTick(() => {
        this.y = -45;
      });
    }
  }
  touchMove(e: any) {
    if (e.detail.source == "" && e.detail.y != 0) {
      this.isLoad = 3;
    } else if (e.detail.y > this.threshold) {
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
  position: fixed;
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
.load-icon-view {
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  font-size: 28upx;
  color: $main-color;
  position: absolute;
  top: -45px;
}
.load-icon {
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transform: scale(0.8);
  opacity: 0.5;
}
.load-icon-list:nth-child(1) {
  animation: load 1s infinite linear;
}
.load-icon-list:nth-child(2) {
  animation: load 1s infinite linear;
  animation-delay: 0.5s;
}
.load-icon-list:nth-child(3) {
  animation: load 1s infinite linear;
  animation-delay: 1s;
}
@keyframes load {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
.refresh-icon {
  width: 25px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26upx;
  transition: 0.25s;
}
.refresh-icon.top {
  transform: rotate(180deg);
}
.load-icon-list {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: $main-color;
}
.load-font {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
