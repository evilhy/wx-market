import Http from './base'
import helper from 'utils/helper'

class Select {
  selectBase (type) {
    let dictStorage = helper.getDic(type)
    if (dictStorage.length) {
      return Promise.resolve({ data: dictStorage })
    } else {
      let http = new Http()
      http.path = `base/${type}/dictItem`
      return http.get().then(res => {
        helper.saveDic(type, res.data)
        return res
      })
    }
  }
  /**
   * 客户类型
   */
   WithdrawalStatusEnum () {
    return this.selectBase('WithdrawalStatusEnum')
  }
}
export default new Select()
