import helper from 'utils/helper'
import Http from './base'

const moduleName = 'manager'
class Manager {
  /**
   * @description 查询客户经理信息
   */
  managerInfo() {
    const http = new Http()
    http.path = `/${moduleName}/managerInfo`
    return http.get()
  }

  /**
   * @description 通知企业分配客户经理
   */
  distribute() {
    const http = new Http()
    http.path = '/manager/distribute'
    http.body = { groupId: helper.getUserInfo('groupId', '') }
    return http.post()
  }

  /**
   * @description 查询客户经理信息及当前用户是本行他行卡
   */
  openingTips() {
    const http = new Http()
    http.path = `/${moduleName}/openingTips`
    return http.get()
  }
}
export default new Manager()
