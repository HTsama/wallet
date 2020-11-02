<!--
 * @Description 
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-11-01 11:43:41
 * @FilePath /wallet/src/pages/edit-words/index.vue
-->
<template>
  <div>
    <u-title title="" :theme="false"></u-title>
    <u-body v-bind:bottom="bottom">
      <div class="view-group">
        <div class="view-title">
          <p>验证</p>
          <p>助记词</p>
        </div>
        <div class="list-group">
          <p class="tis">
            请根据您抄写的助记词，按顺序选择填充。
          </p>
          <div class="twe-view">
            <div
              class="twe-list"
              v-for="(item, index) in editWords"
              v-bind:key="index"
            >
              <div
                class="remove iconfont u-del"
                v-if="item.right == false"
                @click="removeThis(item, index)"
              ></div>
              {{ item.title }}
            </div>
          </div>
          <div class="error" v-if="error">
            助记词顺序错误，请检查您抄写的是否正确
          </div>
          <div class="twe-chose ">
            <div
              :class="'twe-chose-list ' + (item.chose ? 'true' : 'false')"
              v-for="(item, index) in randWords"
              v-bind:key="index"
              @click="addThis(item, index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </u-body>
    <div class="btn-view-group">
      <div :class="'btn-view primary ' + (next || error ? 'stop' : '')">
        <button class="btn-default" hover-class="btn-hover" @click="goNext">
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component()
export default class EditWords extends Vue {
  title = "验证助记词";
  v = {};
  words = [];
  next = true;
  randWords = [];
  editWords = [];
  bottom = 130 / (750 / uni.getSystemInfoSync().windowWidth);
  error = false;
  onLoad(options) {
    this.localwallet = uni.getStorageSync("wallet");
    this.v = JSON.parse(options.v);
    this.words = this.v.wallet.mnemonic.split(" ");
    this.randWords = this.rand(JSON.parse(JSON.stringify(this.words)));
    for (let k = 0; k < this.randWords.length; k++) {
      this.editWords.push("");
    }
  }
  addThis(item, index) {
    let chose = 0;
    if (this.error) {
      return;
    }
    if (item.chose == false) {
      this.$set(this.randWords, index, {
        title: this.randWords[index].title,
        chose: true,
      });
      this.editWords.some((v, i) => {
        if (v == "") {
          chose = i;
          if (this.words[i] != item.title) {
            this.error = true;
          }
          this.$set(this.editWords, i, {
            title: item.title,
            right: this.words[i] == item.title,
          });
        }
        return v == "";
      });

      this.next = this.editWords.some((v, i) => {
        return v == "";
      });
      console.log(this.next);
    }
  }
  removeThis(item, index) {
    let i = null;
    this.randWords.some((v, s) => {
      if (v.title == item.title) {
        i = s;
      }
      return v.title == item.title;
    });
    console.log(i);
    this.error = false;
    this.$set(this.randWords, i, {
      title: this.randWords[i].title,
      chose: false,
    });
    this.$set(this.editWords, index, "");
  }
  goNext() {
    if (this.next == false && this.error == false) {
      if (!this.localwallet) {
        this.localwallet = [];
      }
      this.localwallet = [...this.localwallet, ...[this.v]];
      uni.setStorageSync("wallet", this.localwallet);
      uni.navigateBack({
        delta: 5,
      });
    }
  }
  rand(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    let arr = array.map((item) => {
      return {
        title: item,
        chose: false,
      };
    });
    return arr;
  }
}
</script>

<style lang="scss">
.btn-view.stop {
  opacity: 0.25;
}
.btn-view-group {
  width: 750upx;
  display: flex;
  position: fixed;
  bottom: 0;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30upx;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
.view-group {
  display: block;
}
.error {
  color: #f7603b;
  background: rgba(247, 96, 59, 0.25);
  font-size: 26upx;
  box-sizing: border-box;
  padding: 10upx;
  border-radius: 6upx;
}
.btn-view-group p {
  font-size: 24upx;
  color: $main-color;
  margin-top: 20upx;
}
.red {
  margin-top: 10upx;
}
.red p {
  font-size: 26upx;
  color: #c61f1d;
  height: 42upx;
  line-height: 45upx;
}
.view-group {
  justify-content: flex-start;
}
.list-group {
  margin-top: 60upx;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30upx;
}
.tis {
  font-size: 28upx;
  color: #333;
}
.twe-view {
  width: 690upx;
  height: 380upx;
  border-radius: 10upx;
  background: #f5f5f5;
  margin: 30upx 0;
  box-sizing: border-box;
  padding: 20upx 20upx 0 20upx;
  overflow: hidden;
}
.view-title {
  margin-left: 30upx;
}
.twe-chose {
  width: 690upx;
  height: 380upx;
  border-radius: 10upx;
  margin: 30upx 0;
  box-sizing: border-box;
  overflow: hidden;
}
.twe-list {
  width: 200upx;
  background: #fff;
  height: 70upx;
  margin-bottom: 20upx;
  border-radius: 5upx;
  display: flex;
  font-size: 28upx;
  position: relative;
  margin-right: 20upx;
  float: left;
  justify-content: center;
  align-items: center;
}
.remove {
  color: #f7603b;
  position: absolute;
  width: 30upx;
  height: 30upx;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -15upx;
  top: -15upx;
}
.twe-list:nth-child(3n),
.twe-chose-list:nth-child(3n) {
  margin-right: 0;
}
.twe-chose-list {
  width: 210upx;
  background: #fff;
  height: 70upx;
  border: 1px solid #efefef;
  margin-bottom: 20upx;
  border-radius: 5upx;
  display: flex;
  font-size: 28upx;
  margin-right: 20upx;
  float: left;
  justify-content: center;
  align-items: center;
}
.twe-chose-list.true {
  opacity: 0.5;
  background: #efefef;
}
</style>
