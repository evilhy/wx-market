import Http from './base'
const moduleName = 'manager'
class Manager {
    managerInfo () {
        let http = new Http()
        http.path = `/${moduleName}/managerInfo`
        return http.get()
    }
}
export default new Manager()