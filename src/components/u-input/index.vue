<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-16 14:50:15
 * @FilePath /wallet/src/components/u-input/index.vue
-->
<template>
  <div :class="'form-list ' + title">
    <div class="form-list-title">
      <span></span>
      <text>{{ title }}</text>
    </div>
    <div
      class="form-list-input input-view"
      v-if="typeName == 'input' || typeName == 'password'"
    >
      <input
        :type="inputType"
        :adjust-position="true"
        maxlength="-1"
        :cursor-spacing="0"
        :placeholder="placeholder"
        @input="changevalue"
        :password="typeName == 'password' ? true : false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    name: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "text",
    },
    typeName: {
      type: String,
      default: "input",
    },
    placeholder: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
})
export default class UInput extends Vue {
  mounted() {}
  changevalue(e: any) {
    this.$emit("changevalue", {
      name: this.$props.name,
      value: e.detail.value,
    });
  }
}
</script>
<style lang="scss">
.form-list {
  width: 100%;
}
.form-list-title {
  height: 60upx;
  display: flex;
  align-items: center;
  font-weight: bold;
  flex-direction: row;
  font-size: 30upx;
}
.form-list-title span {
  width: 16upx;
  height: 16upx;
  border: 4upx solid $main-color;
  box-sizing: border-box;
  border-radius: 20upx;
  background: #fff;
  margin-right: 20upx;
}
.input-view {
  height: 100upx;
}
.input-view input {
  height: 100upx;
  font-size: 32upx;
}
</style>
