<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DatoWalletService } from "../../service/web3";
import { Abi } from "../../service/Abi";

@Component
export default class Demo extends Vue {
  DatoWallet?: DatoWalletService;

  onLoad() {
    this.DatoWallet = new DatoWalletService("http://118.190.100.235:8545");
    // const walt = this.DatoWallet.createWallet("12345678");

    // // 导入助记词
    // this.DatoWallet.importWalletFromMnemonic(walt.mnemonic);

    // // 导入keystore
    // this.DatoWallet.importWalletFromKeyStore(
    //   JSON.stringify(walt.keystore),
    //   "12345678"
    // );

    this.DatoWallet.contractTransaction(
      "0x857eF46Cd9609Fb4098353a64F62Cfd99Be67266",
      "0x1d034A4ABC84412743aaC33d0a99c6343c3669BE",
      "0xc6e412e3a9ca838fa297241bdae3ab21e148571d7d2a9e316a60dd7813f45e9a",
      "5",
      Abi as any,
      "0xa0E1F40b1E30f4bAf5678aa7e41d9Fb3e1572212"
    );
  }
}
</script>
