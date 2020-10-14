<script lang="ts">
import Vue from "vue";
import { globalDataInterface } from "./core/interface";
export default Vue.extend({
  mpType: "app",
  globalData: {},
  onLaunch() {
    let globalData = this.$options.globalData;
    const that = this;
    uni.getSystemInfo({
      success(r) {
        (that.$options.globalData as globalDataInterface).phoneInfo = r;
      },
    });
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
});
</script>

<style>
@import "/config/index.css";
</style>
