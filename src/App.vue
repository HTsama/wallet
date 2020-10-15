<script lang="ts">
import Vue from "vue";
import { globalDataInterface } from "./core/interface";
export default Vue.extend({
  mpType: "app",
  globalData: {},
  onLaunch() {
    Vue.prototype.globalData = uni.getSystemInfoSync();
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
