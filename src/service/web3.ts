import Web3 from 'web3';
const Tx = require('ethereumjs-tx');

export class DatoWalletService {
  constructor(url: string) {
    this._web3 = new Web3(new Web3.providers.HttpProvider(url));
    console.log("连接网络:", this._web3);
  }

  // 内部web3对象（单例）
  private _web3!: Web3;

  //=============钱包创建 与 钱包导入================================

  /**
   * 创建一个随机钱包实例
   */
  createWallet() {
    let account = this._web3.eth.accounts.create();
    let address = account.address;
    let privateKey = account.privateKey;
    return
  }

  /**
   * 通过私钥导入钱包
   * @param privateKey 
   */
  importWalletFromPrivateKey(privateKey: string) {
    // 通过私钥解锁账户
    let account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    return account;
  }

  /**
   * 转账
   * @param fromAddr 
   * @param fromAddrKey 
   * @param toAddr 
   * @param contractAddr 
   * @param gasPrice 
   * @param gasLimit 
   */
  async transaction(fromAddr: string, amount: string) {
    let nonce = await this._web3.eth.getTransactionCount(fromAddr);
    let gasPrice = await this._web3.eth.getGasPrice();
    let balance = await this._web3.utils.toWei(amount, 'ether');

    // var privateKey = Buffer.from(privatekey.slice(2), 'hex')

    // var rawTx = {
    //   from: fromaddress,
    //   nonce: nonce,
    //   gasPrice: gasPrice,
    //   to: toaddress,
    //   value: balance,
    //   data: '0x00'//转Token代币会用到的一个字段
    // }
    // //需要将交易的数据进行预估gas计算，然后将gas值设置到数据参数中
    // let gas = await web3.eth.estimateGas(rawTx)
    // rawTx.gas = gas
  };
}
