export default {
  isIdCard(value) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  },
  isEmail(value) {
    return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(value)
  },
  isCH(value) {
    return /[^\u4e00-\u9fa5]/.test(value)
  },
  isPhone(value) {
    return /^1[0-9]{10}/.test(value)
  },
  isCode (value) { 
    return /[0-9]{6}/.test(value)
  }
}
