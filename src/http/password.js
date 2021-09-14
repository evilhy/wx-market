import helper from 'utils/helper'
import Http from './base'

const moduleName = 'password'

class Password {
  /**
   * 查询用户是否开启手势密码
   *
   * @returns
   * @memberof Password
   */
  queryHandPassword() {
    const hasHandPassword = helper.getUserInfo('handPassword', -1)
    if (hasHandPassword > -1) {
      return Promise.resolve({ data: { status: hasHandPassword } })
    }
    const http = new Http()
    http.path = `/${moduleName}/queryHandPassword`
    return http.get().then((res) => {
      helper.saveUserInfo({ handPassword: res.data.status })
      return res
    })
  }

  /**
   * 关闭手势密码
   *
   * @returns
   * @memberof Password
   */
  closeHandPassword() {
    const http = new Http()
    http.path = `/${moduleName}/closeHandPassword`
    return http.get()
  }

  /**
   * 创建数字键盘
   *
   * @returns
   * @memberof Password
   */
  crateNumericKeypad() {
    const http = new Http()
    http.path = `/${moduleName}/crateNumericKeypad`
    http.loading = { parent: document.querySelector('.pwd-keyboard-popup'), type: 'bounce' }
    return http.get()
  }

  /**
   * 校验数字密码和手势密码
   *
   * @param {String} password N1~N9,以逗号分隔
   * @param {String} type '0':数字密码 '1':手势密码
   * @returns
   * @memberof Password
   */
  checkPassword(password, type) {
    const http = new Http()
    http.path = `/${moduleName}/checkPassword`
    http.body = { password, type }
    return http.post()
  }

  /**
   * 设置数字密码和手势密码
   *
   * @param {String} password N1~N9,以逗号分隔
   * @param {String} type '0':数字密码 '1':手势密码
   * @returns
   * @memberof Password
   */
  savePassword(firstPassword, password, type) {
    const http = new Http()
    http.path = `/${moduleName}/savePassword`
    http.body = { firstPassword, password, type }
    return http.post()
  }
}

export default new Password()
