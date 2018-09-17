import Http from './base'
import helper from 'utils/helper'
const moduleName = 'manager'
class Manager {
    managerInfo () {
        let http = new Http()
        http.path = `/${moduleName}/managerInfo`
        return http.get()
    }
    distribute () {
        let http = new Http()
        http.path = '/manager/distribute'
        http.body = { groupId: helper.getUserInfo('groupId', '') }
        return http.post()
    }
}
export default new Manager()