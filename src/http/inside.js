import Http from './base'
import helper from '../utils/helper'
class Inside {
    sendCode (phone = helper.getUserInfo('phone', ''), busiType = '0') {
        let http = new Http()
        http.path = '/inside/sendCode'
        http.body = { phone, busiType }
        return http.post()
    }
}
export default new Inside()