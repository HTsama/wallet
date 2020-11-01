/*
 * @Description
 * @author 张晓龙 <2467365764@qq.com>
 * @copyright 2020
 * @Date 2020-10-14 10:31:34
 * @FilePath /wallet/src/core/interface.ts
 */
export interface globalDataInterface {
  phoneInfo: Object
}
export interface utilsInterface {
  /** 获取key对应的value */
  getValue: (arg0: Object, arg1: String) => any;
  /** 获取数组中某key和某值对等的对象 */
  getObj: (arg0: Array<any>, arg1: String, arg2: String) => any;
  getBalance: (arg0: Object, arg1: String) => any;
  load: () => any,
  throttle: (arg0: any, arg1: any) => any
}

export interface WalletConfigInterface {
  DETO: {
    ip: string,
    id: number
  },
  ETH: {
    ip: string,
    id: number
  }
}