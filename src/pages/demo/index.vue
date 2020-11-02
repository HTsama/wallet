<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DatoWalletService } from "../../service/web3";

@Component
export default class Demo extends Vue {
  DatoWallet?: DatoWalletService;

  onLoad() {
    console.log("load!!!");
    this.DatoWallet = new DatoWalletService("http://118.190.100.235:8545");
    this.DatoWallet.createWallet("12345678");
  }
}
</script>
