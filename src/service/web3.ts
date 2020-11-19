import { BigNumber } from "ethers";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { hdkey } from "ethereumjs-wallet";
import * as util from "ethereumjs-util";

const TX = require("ethereumjs-tx");
const crypto = require("crypto");
import { mnemonicToSeed, entropyToMnemonic } from "@ethersproject/hdnode";

export class DatoWalletService {
  constructor(url: string) {
    this._web3 = new Web3(new Web3.providers.HttpProvider(url));
    console.log("连接网络:", this._web3);
  }
  // 内部web3对象（单例）
  private _web3!: Web3;

  //=============钱包创建 与 钱包导入================================
  /**
   * 创建钱包
   * @param password
   * @returns
   */
  createWallet(password: string) {
    console.log("创建钱包 !!!");
    // 生成助记词
    const entropy = crypto.randomBytes(16);
    const mnemonic = entropyToMnemonic(entropy);
    // 根据助记词获取种子
    const hdWallet = hdkey.fromMasterSeed(
      util.toBuffer(mnemonicToSeed(mnemonic))
    );
    // 路径
    const path = "m/44'/60'/0'/0/0";
    // 根据路径获取钱包信息
    const wallet = hdWallet.derivePath(path).getWallet();
    // 获取私钥
    const privateKey = "0x" + wallet.getPrivateKey().toString("hex");
    // 获取公钥
    const publicKey = wallet.getPublicKey().toString("hex");
    // 根据私钥获取账户
    const account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    // 根据私钥和密码（用户输入的）获取 加密的json
    const keystore = this._web3.eth.accounts.encrypt(privateKey, password);
    console.log(`地址: ${account.address}`);
    console.log(`私钥: ${privateKey}`);
    console.log(`公钥: ${publicKey}`);
    console.log(`助记词: ${mnemonic}`);
    console.log(`KeyStore: ${JSON.stringify(keystore)}`);
    return {
      mnemonic: mnemonic,
      privateKey: privateKey,
      publicKey: publicKey,
      address: account.address,
      keystore: keystore,
    };
  }

  /**
   * 通过私钥和密码导入钱包
   * @param privateKey
   * @param password
   */
  importWalletFromPrivateKey(privateKey: string, password: string) {
    console.log("通过私钥和密码导入钱包 !!!!");
    const account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    const keystore = this._web3.eth.accounts.encrypt(privateKey, password);
    console.log(`地址: ${account.address}`);
    console.log(`私钥: ${privateKey}`);
    console.log(`KeyStore: ${JSON.stringify(keystore)}`);
    return {
      privateKey: privateKey,
      address: account.address,
      keystore: keystore,
    };
  }

  /**
   * 通过助记词导入钱包
   * @param mnemonic 助记词
   */
  importWalletFromMnemonic(mnemonic: string) {
    console.log("通过助记词导入钱包 !!!!");
    // 根据助记词获取种子
    const hdWallet = hdkey.fromMasterSeed(
      util.toBuffer(mnemonicToSeed(mnemonic))
    );
    // 路径
    const path = "m/44'/60'/0'/0/0";
    // 根据路径获取钱包信息
    const wallet = hdWallet.derivePath(path).getWallet();
    // 获取私钥
    const privateKey = "0x" + wallet.getPrivateKey().toString("hex");
    // 获取公钥
    const publicKey = wallet.getPublicKey().toString("hex");
    const account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log("地址：" + account.address);
    console.log("公钥：" + publicKey);
    console.log("私钥1：" + privateKey);
    console.log("私钥2：" + account.privateKey);
    return {
      privateKey: privateKey,
      publicKey: publicKey,
      address: account.address,
    };
  }

  /**
   * 通过KeyStore和密码导入钱包
   * @param keyStoreJson
   * @param password
   */
  importWalletFromKeyStore(keyStoreJson: string, password: string) {
    console.log("通过KeyStore和密码导入钱包 !!!!");
    const account = this._web3.eth.accounts.decrypt(
      JSON.parse(keyStoreJson),
      password
    );
    const keystore = this._web3.eth.accounts.encrypt(
      account.privateKey,
      password
    );
    console.log("keystore: " + JSON.stringify(keystore));
    console.log("地址：" + account.address);
    console.log("私钥：" + account.privateKey);
    return {
      privateKey: account.privateKey,
      address: account.address,
      keystore: keystore,
    };
  }

  /**
   * 转账
   * @param fromAddr 发件人
   * @param toAddr 收件人
   * @param privateKey 发件人私钥
   * @param amount 钱
   */
  async transaction(
    fromAddr: string,
    toAddr: string,
    privateKey: string,
    amount: string
  ) {
    const balance = await this._web3.eth.getBalance(fromAddr);
    const gasPrice = await this._web3.eth.getGasPrice();
    let txFeeInWei = BigNumber.from(gasPrice).mul(21000);
    let value: BigNumber = BigNumber.from(balance).sub(txFeeInWei);
    let a = BigNumber.from(amount);
    if (value < a) {
      console.log("WARNING: 余额不足!");
      return;
    }
    const accountNonce = await this._web3.eth.getTransactionCount(fromAddr);
    const txData = {
      nonce: this._web3.utils.toHex(accountNonce),
      gasLimit: this._web3.utils.toHex(21000),
      gasPrice: this._web3.utils.toHex(gasPrice),
      to: toAddr,
      from: fromAddr,
      chainId: await this._web3.eth.getChainId(),
      value: Number(this._web3.utils.toWei(amount, "ether")),
    };
    const tx = new TX(txData);
    const _privateKey = Buffer.from(
      privateKey.substring(2, privateKey.length),
      "hex"
    );
    tx.sign(_privateKey);
    var serializedTx = tx.serialize();
    let that = this;
    this._web3.eth.sendSignedTransaction(
      "0x" + serializedTx.toString("hex"),
      async function(err, hash) {
        if (!err) {
          const receipt = await that._web3.eth.getTransactionReceipt(hash);
          console.log(receipt);
        } else {
          console.error(err);
        }
      }
    );
  }

  /**
   * 合约转账
   * @param fromAddr 发件人地址
   * @param registryAddr 合约地址
   * @param privateKey 发件人私钥
   * @param amount 钱
   * @param contractAbi 智能合约Abi文件
   * @param contractToAddr 智能合约转账中的对方地址
   */
  async contractTransaction(
    fromAddr: string,
    registryAddr: string,
    privateKey: string,
    amount: string,
    contractAbi: AbiItem,
    contractToAddr: string
  ) {
    //获取合约实例
    const myContract = new this._web3.eth.Contract(contractAbi, registryAddr);

    //获取nonce,使用本地私钥发送交易
    const accountNonce = await this._web3.eth.getTransactionCount(fromAddr);

    const txData = {
      nonce: this._web3.utils.toHex(accountNonce), // nonce,
      gasLimit: this._web3.utils.toHex(21000), //"0x271000",
      to: registryAddr,
      data: myContract.methods.transfer(contractToAddr, amount).encodeABI(), //ERC20转账
    };

    const tx = new TX(txData);

    const _privateKey = Buffer.from(
      privateKey.substring(2, privateKey.length),
      "hex"
    );
    tx.sign(_privateKey);

    const serializedTx = tx.serialize();
    const that = this;
    this._web3.eth.sendSignedTransaction(
      "0x" + serializedTx.toString("hex"),
      async function(err, hash) {
        if (!err) {
          const receipt = await that._web3.eth.getTransactionReceipt(hash);
          console.log(receipt);
        } else {
          console.error(err);
        }
      }
    );
  }
}
