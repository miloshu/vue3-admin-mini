const generateUUID = () => {
  let uuid = ''
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
  }
  return uuid
}

/**
 * @description: 判断值是否未某个类型
 */
const is = (val, type) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
const isFunction = val => is(val, "Function")

/**
 * @description: 是否已定义
 */
const isDef = val => typeof val !== "undefined"

/**
 * @description: 是否未定义
 */
const isUnDef = val => !isDef(val)

/**
 * @description: 是否为对象
 */
const isObject = val => val !== null && is(val, "Object")

/**
 * @description:  是否为时间
 */
const isDate = val => is(val, "Date")

/**
 * @description:  是否为数值
 */
const isNumber = val => is(val, "Number")

/**
 * @description:  是否为promise
 */
const isPromise = (val) => {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}


/**
 * @description:  是否为数组
 */
const isArray = val => val && Array.isArray(val)

/**
 * @description: 是否客户端
 */
const isClient = () => typeof window !== "undefined";

/**
 * @description: 是否为浏览器
 */
const isWindow = val => typeof window !== "undefined" && is(val, "Window");

/**
 * @description: 是否为 element 元素
 */
const isElement = val => isObject(val) && !!val.tagName;

/**
 * @description: 是否为 16 进制颜色
 */
const isHexColor = str => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

// 手机号校验
const validatePhone = (rule, value, callback) => {
  let regExp = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (!value) {
    callback(new Error('请输入手机号'))
  }
  if (!regExp.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
// 邮箱校验
const validateEmail = (rule, value, callback) => {
  let regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!value) {
    callback(new Error('请输入邮箱'))
  }
  if (!regExp.test(value)) {
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
// 身份证号, 支持1/2代(15位/18位数字)
const validateIDCardNo = (rule, value, callback) => {
  let regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    callback(new Error('请输入身份证号'))
  }
  if (!regExp.test(value)) {
    callback(new Error('身份证号格式错误'))
  } else {
    callback()
  }
}
// 银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）
const validateBankCardNo = (rule, value, callback) => {
  let regExp = /^[1-9]\d{9,29}$/
  if (!value) {
    callback(new Error('请输入银行卡号'))
  }
  if (!regExp.test(value)) {
    callback(new Error('银行卡号格式错误'))
  } else {
    callback()
  }
}
export {
  is,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isPromise,
  isArray,
  isClient,
  isWindow,
  isElement,
  isHexColor,
  generateUUID,
  validatePhone,
  validateEmail,
  validateIDCardNo,
  validateBankCardNo
}
