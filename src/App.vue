<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { globalDataInterface } from "./core/interface";
@Component
export default class extends Vue {
  mpType = "app";
  globalData = {};
  onLaunch() {
    let globalData = this.$options.globalData;
    const that = this;
    uni.getSystemInfo({
      success(r) {
        (that.$options.globalData as globalDataInterface).phoneInfo = r;
      },
    });
  }
  onShow() {
    console.log("App Show");
  }
  onHide() {
    console.log("App Hide");
  }
}
</script>

<style>
@import "/config/index.css";
</style>
