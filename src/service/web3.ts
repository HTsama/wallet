import { BigNumber } from 'ethers';
import Web3 from 'web3';
import { hdkey } from 'ethereumjs-wallet';
import * as util from 'ethereumjs-util';
const Tx = require('ethereumjs-tx');
const crypto = require('crypto');
import { mnemonicToSeed, entropyToMnemonic } from '@ethersproject/hdnode'

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
    console.log('创建钱包 !!!')
    // 生成助记词
    const entropy = crypto.randomBytes(16);
    const mnemonic = entropyToMnemonic(entropy);
    // 根据助记词获取种子
    const hdWallet = hdkey.fromMasterSeed(util.toBuffer(mnemonicToSeed(mnemonic)));
    // 路径
    const path = 'm/44\'/60\'/0\'/0/0';
    // 根据路径获取钱包信息
    const wallet = hdWallet.derivePath(path).getWallet();
    // 获取私钥
    const privateKey = '0x' + wallet.getPrivateKey().toString('hex');
    // 获取公钥
    const publicKey = wallet.getPublicKey().toString('hex');
    // 根据私钥获取账户
    const account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    // 根据私钥和密码（用户输入的）获取 加密的json
    const keystore = this._web3.eth.accounts.encrypt(privateKey, password)
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
    }
  }

  /**
   * 通过私钥和密码导入钱包
   * @param privateKey 
   * @param password 
   */
  importWalletFromPrivateKey(privateKey: string, password: string) {
    console.log('通过私钥和密码导入钱包 !!!!')
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
    console.log('通过助记词导入钱包 !!!!')
    // 根据助记词获取种子
    const hdWallet = hdkey.fromMasterSeed(util.toBuffer(mnemonicToSeed(mnemonic)));
    // 路径
    const path = 'm/44\'/60\'/0\'/0/0';
    // 根据路径获取钱包信息
    const wallet = hdWallet.derivePath(path).getWallet();
    // 获取私钥
    const privateKey = '0x' + wallet.getPrivateKey().toString('hex');
    // 获取公钥
    const publicKey = wallet.getPublicKey().toString('hex');
    const account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log('地址：' + account.address)
    console.log('公钥：' + publicKey)
    console.log('私钥1：' + privateKey)
    console.log('私钥2：' + account.privateKey)
    return {
      privateKey: privateKey,
      publicKey: publicKey,
      address: account.address
    };
  }


  /**
   * 通过KeyStore和密码导入钱包
   * @param keyStoreJson 
   * @param password 
   */
  importWalletFromKeyStore(keyStoreJson: string, password: string) {
    console.log('通过KeyStore和密码导入钱包 !!!!')
    const account = this._web3.eth.accounts.decrypt(JSON.parse(keyStoreJson), password);
    const keystore = this._web3.eth.accounts.encrypt(account.privateKey, password);
    console.log('keystore: ' + JSON.stringify(keystore))
    console.log('地址：' + account.address)
    console.log('私钥：' + account.privateKey)
    return {
      privateKey: account.privateKey,
      address: account.address,
      keystore: keystore
    };
  }


  /**
   * 转账
   * @param fromAddr 发件人
   * @param toAddr 收件人
   * @param privateKey 发件人私钥
   * @param amount 钱
   */
  async transaction(fromAddr: string, toAddr: string, privateKey: string, amount: string) {
    // 查询from账户以太币余额
    const balance = await this._web3.eth.getBalance(fromAddr);

    const gasPrice = await this._web3.eth.getGasPrice();

    // 判断扣掉Gas手续费后 余额大于转账额度
    let txFeeInWei = BigNumber.from(gasPrice).mul(21000);
    let value: BigNumber = BigNumber.from(balance).sub(txFeeInWei);
    if (value < BigNumber.from(amount)) {
      console.log("WARNING: 余额不足!");
      return;
    }

    // 以太币转账    
    // 先获取当前账号交易的nonce
    let nonce = await this._web3.eth.getTransactionCount(fromAddr, this._web3.eth.defaultBlock)

    // 获取交易数据
    const txData = {
      // nonce每次++，以免覆盖之前pending中的交易
      nonce: this._web3.utils.toHex(nonce++),
      // 设置gasLimit和gasPrice
      gasLimit: this._web3.utils.toHex(21000),
      gasPrice: this._web3.utils.toHex(gasPrice),
      // 要转账的哪个账号  
      to: toAddr,
      // 从哪个账号转
      from: fromAddr,
      // 以太币
      value: value.toHexString(),
      data: ''
    }

    const tx = new Tx(txData);

    // 引入私钥，并转换为16进制
    const _privateKey = Buffer.from(privateKey, 'hex');

    // 用私钥签署交易
    tx.sign(_privateKey);

    // 序列化
    const serializedTx = tx.serialize().toString('hex');

    const that = this
    this._web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), async function (err, hash) {
      if (!err) {
        console.log(hash);
        // 根据交易哈希值返回交易的收据
        const receipt = await that._web3.eth.getTransactionReceipt(hash);
        console.log('交易收据 ⬇');
        console.log(`交易状态: ${receipt.status}`); // TRUE如果交易成功，FALSE则EVM还原了交易。
        console.log(`块哈希: ${receipt.blockHash}`); // T此事务所在的块的哈希。
        console.log(`块号: ${receipt.blockNumber}`); // 此事务所在的块的哈希。
        console.log(`交易的哈希值: ${receipt.transactionHash}`); // 交易的哈希值。·
        console.log(`交易索引: ${receipt.transactionIndex}`); // 块中交易索引位置的整数。
        console.log(`发件人地址: ${receipt.from}`); // 发件人地址。
        console.log(`接收方地址: ${receipt.to}`); // 接收方地址。null当它是合同创建交易时。
        console.log(`gas: ${receipt.cumulativeGasUsed}`); // 在区块中执行此交易时使用的天然气总量。
        console.log(`使用的gas: ${receipt.gasUsed}`); // 仅此特定交易使用的天然气量。
        console.log(`日志: ${receipt.logs}`); // 此事务生成的日志对象数组。
      } else {
        console.error(err);
      }
    });

  };
}
