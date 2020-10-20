import { BigNumber } from 'ethers';
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
   * @param toAddr 
   * @param privateKey 
   * @param amount 
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
        console.log(`交易的哈希值: ${receipt.transactionHash}`); // 交易的哈希值。
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
