/*
 * @Description
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-15 09:22:09
 * @FilePath /wallet/src/util/index.ts
 */
import web3 from 'web3';
import { BigNumber, ethers, providers, Wallet } from 'ethers';
import { utilsInterface } from "../core/interface";
let globalData = {
  gapTime: null,
  lastTime: null,
  lastTime: null,
  isObject: (obj: any) => {
    return Object.prototype.toString.call(obj) === "[object Object]"
  }
}
// 获取key对应的value
export const getValue = (data: any, target: string): any => {
  for (const key of Object.keys(data)) {
    if (key === target) {
      return data[key];
    }
    if (globalData.isObject(data[key])) {
      const result = getValue(data[key], target);
      if (typeof result !== "undefined") {
        return result;
      }
    }
  }
};

// 获取数组中某key和某值对等的对象
export const getObj = (arr: Array<any>, title: string, name: string) => {
  let d = null;
  for (let k = 0; k < arr.length; k++) {
    if (arr[k][title] == name) {
      d = arr[k];
    }
  }
  return d;
};

export const getBalance = async (url: string, address: string) => {
  // #ifdef APP-PLUS
  (global as any).XMLHttpRequest = plus.net.XMLHttpRequest;
  // #endif
  (global as any).XMLHttpRequest = XMLHttpRequest;
  return ethers.utils.formatEther(await new web3(url).eth.getBalance(address))
}

export const load = () => {
  return {
    show() {
      (this as any).show = function () {
        let d = document.createElement('div');
        d.setAttribute('class', 'load-g')
        document.body.appendChild(d);
      }
    }
  };

}

export default <utilsInterface>{
  getObj: getObj,
  getValue: getValue,
  getBalance: getBalance,
  load: load,
}
