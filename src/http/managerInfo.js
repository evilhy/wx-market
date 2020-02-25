import Http from './base'
const moduleName = 'managerInfo'
class ManagerInfo {
    /**
     * @description 查询客户经理信息及当前用户是本行他行卡
     */
    openingTips () {
        let http = new Http()
        http.path = `/${moduleName}/openingTips`
        return http.get()
    }
}
export default new ManagerInfo()
