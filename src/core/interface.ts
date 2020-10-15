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
  /** 获取1 */
  getValue: (arg0: Array<any>, arg1: String) => any,
  /** 获取2 */
  getObj: (arg0: Array<any>, arg1: String, arg2: String) => any,
}