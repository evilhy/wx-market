import Http from './base'
import helper from 'utils/helper'
const moduleName = 'manager'
class Manager {
    /**
     * @description 查询客户经理信息
     */
    managerInfo () {
        let http = new Http()
        http.path = `/${moduleName}/managerInfo`
        return http.get()
    }
    /**
     * @description 通知企业分配客户经理
     */
    distribute () {
        let http = new Http()
        http.path = '/manager/distribute'
        http.body = { groupId: helper.getUserInfo('groupId', '') }
        return http.post()
    }
}
export default new Manager()