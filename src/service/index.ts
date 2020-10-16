//ETH 充值提现 合约地址

import { BigNumber, ethers, providers, Wallet } from 'ethers';

export class DatoWallet {
  constructor(url: string, chainId: number) {
    this.chainId = chainId;
    this.DATO_provider = new ethers.providers.JsonRpcProvider(url);
  }

  private chainId: number = 0
  private DATO_wallet: Wallet | null = null;
  private DATO_provider: providers.JsonRpcProvider;

  //测试 钱包创建 与 钱包导入
  test() {
    //创建新钱包
    this.DATO_wallet = this.createWallet();
    //通过助记词创建新钱包
    this.DATO_wallet = this.createWalletFromMnemonic("window habit dragon snake case alien roast clock hold bar public dust");
    //通过私钥创建新钱包
    this.DATO_wallet = this.createWalletFromPrivateKey("0xc6e412e3a9ca838fa297241bdae3ab21e148571d7d2a9e316a60dd7813f45e9a");
    let data = {
      id: "fb1280c0-d646-4e40-9550-7026b1be504a",
      address: "88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
      Crypto: {
        kdfparams: {
          dklen: 32,
          p: 1,
          salt: "bbfa53547e3e3bfcc9786a2cbef8504a5031d82734ecef02153e29daeed658fd",
          r: 8,
          n: 262144
        },
        kdf: "scrypt",
        ciphertext: "10adcc8bcaf49474c6710460e0dc974331f71ee4c7baa7314b4a23d25fd6c406",
        mac: "1cf53b5ae8d75f8c037b453e7c3c61b010225d916768a6b145adf5cf9cb3a703",
        cipher: "aes-128-ctr",
        cipherparams: {
          iv: "1dcdf13e49cea706994ed38804f6d171"
        }
      },
      "version": 3
    };
    //通过object json 和密码创建新钱包
    this.createWalletFromJsonAndPwd(data, "foo");
    //转账： toAddress 转给地址，amount 金额
    this.transaction("0x8658c2D0754EADA6DC68177a333AE531C1967350", 1);
  }

  //=============钱包创建 与 钱包导入================================

  /**
   * 创建一个随机钱包实例
   */
  createWallet() {
    const hdnode_1 = require("@ethersproject/hdnode");
    const crypto = require('crypto');
    const entropy = crypto.randomBytes(16);
    const mnemonic = hdnode_1.entropyToMnemonic(entropy);
    this.DATO_wallet = Wallet.fromMnemonic(mnemonic);
    // let randomWallet = ethers.Wallet.createRandom();
    console.log(`地址: ${this.DATO_wallet.address}`);
    console.log(`私钥: ${this.DATO_wallet.privateKey}`);
    console.log(`公钥: ${this.DATO_wallet.publicKey}`);
    console.log(`助记词: ${this.DATO_wallet.mnemonic.phrase}`);
    return this.DATO_wallet;
  }

  /**
   * 通过助记词创建新钱包
   * @param String mnemonic 助记词
   */
  createWalletFromMnemonic(mnemonic: string) {
    let that = this;
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.dir(mnemonicWallet);
    console.dir(`地址: ${mnemonicWallet.address}`);
    console.dir(`私钥: ${mnemonicWallet.privateKey}`);
    console.dir(`公钥: ${mnemonicWallet.publicKey}`);
    console.dir(`助记词: ${mnemonicWallet.mnemonic.phrase}`);
    that.DATO_wallet = mnemonicWallet;
    return mnemonicWallet;
  }

  /**
   * 通过私钥创建新钱包
   * @param privateKey 
   */
  createWalletFromPrivateKey(privateKey: string) {
    let that = this;
    let wallet = new ethers.Wallet(privateKey);
    console.dir(wallet);
    console.dir(`地址: ${wallet.address}`);
    console.dir(`私钥: ${wallet.privateKey}`);
    console.dir(`公钥: ${wallet.publicKey}`);
    that.DATO_wallet = wallet;
    return wallet;
  }
  /**
   * 通过object json 和密码创建新钱包
   * @param json 
   * @param pwd 
   */
  createWalletFromJsonAndPwd(json: any, pwd: string) {
    let that = this;
    let jsonstr = JSON.stringify(json);
    ethers.Wallet.fromEncryptedJson(jsonstr, pwd).then(function (wallet) {
      console.log("Address: " + wallet.address);
      // "Address: 0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290"
      console.dir(wallet);
      console.dir(`地址: ${wallet.address}`);
      console.dir(`私钥: ${wallet.privateKey}`);
      console.dir(`公钥: ${wallet.publicKey}`);
      that.DATO_wallet = wallet;
      return wallet;
    });
  }
  //=============================================================
  //查询余额
  async getBalance() {
    let that = this;
    if (that.DATO_wallet) {
      let balance: BigNumber = await that.DATO_provider.getBalance(that.DATO_wallet.address);
      //单位转换
      let v = ethers.utils.formatEther(balance)
      console.dir(`余额：${v}`);

      return v
    } else {
      console.dir("钱包未创建或未导入")
      return '0'
    }

  }
  //转账： toAddress 转给地址，amount 金额
  transaction(toAddress: string, amount: number) {
    let that = this;
    var gasPricePromise = that.DATO_provider.getGasPrice();
    var balancePromise = that.DATO_provider.getBalance(that.DATO_wallet!.address)
    var transactionCountPromise = that.DATO_provider.getTransactionCount(that.DATO_wallet!.address);
    var allPromises = Promise.all([
      gasPricePromise,
      balancePromise,
      transactionCountPromise
    ]);
    var sendPromise = allPromises.then(async function (results) {
      var gasPrice = results[0];
      var balance = results[1];
      var transactionCount = results[2];
      var txFeeInWei = gasPrice.mul(21000);
      var value: BigNumber = balance.sub(txFeeInWei);
      //判断扣掉Gas手续费后 余额大于转账额度
      if (Number(ethers.utils.formatEther(value)) < amount) {
        console.dir("余额不足");
        return;
      }
      var transaction = {
        to: toAddress,
        gasPrice: gasPrice,
        gasLimit: 21000,
        nonce: transactionCount,
        value: ethers.utils.parseEther(`${amount}`),
        chainId: that.chainId,
      };
      //交易信息
      console.dir("交易信息");
      console.dir(transaction);
      //签名后的交易
      var signedTransaction = await that.DATO_wallet!.signTransaction(transaction);
      //发送交易信息到网络
      return that.DATO_provider.sendTransaction(signedTransaction);
    });
    var minedPromise = sendPromise.then(function (transaction) {
      if (transaction) {
        //向网络成功发送交易信息
        console.dir("向网络成功发送交易信息")
        console.dir(transaction)
        //等待公链挖矿确认
        return that.DATO_provider.waitForTransaction(transaction.hash);
      }
    });
    minedPromise.then(function (transaction) {
      if (transaction) {
        //公链已确认 在blockNumber区块中
        console.dir("公链已确认交易信息");
        console.dir(transaction);
        console.log("The transaction was mined: Block " + transaction.blockNumber);
      }
    });
  }

}

// let datoWallet = new DatoWallet("http://118.190.100.235:8545", 19851111);
// //通过私钥创建新钱包
// datoWallet.createWalletFromPrivateKey("0xc6e412e3a9ca838fa297241bdae3ab21e148571d7d2a9e316a60dd7813f45e9a");
// //查询余额
// datoWallet.getBalance();
// //转账
// datoWallet.transaction("0x8658c2D0754EADA6DC68177a333AE531C1967350", 1);
