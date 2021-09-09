import helper from 'utils/helper'
import Http from './base'

class Select {
  selectBase(type) {
    const dictStorage = helper.getDic(type)
    if (dictStorage.length) {
      return Promise.resolve({ data: dictStorage })
    }
    const http = new Http()
    http.path = `base/${type}/dictItem`
    return http.get().then((res) => {
      helper.saveDic(type, res.data)
      return res
    })
  }

  /**
   * 客户类型
   */
  WithdrawalStatusEnum() {
    return this.selectBase('WithdrawalStatusEnum')
  }
}
export default new Select()
