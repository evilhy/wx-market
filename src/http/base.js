import HttpEngine from 'core/plugins/http/HttpEngine'
import sysConfig from 'src/utils/constant'
import helper from 'src/utils/helper'
import { Indicator } from 'mint-ui'
import _ from 'lodash'

export default class HttpForApplication extends HttpEngine {

  baseURL = sysConfig.http_base_url[sysConfig.node_env]
  mockTimeout = 1
  requestedSever = sysConfig.requested_sever
  beforeSendRequestHandler (config) {
    config.headers = Object.assign(config.headers, {
      jsessionId: helper.getUserInfo('jsessionId', '')
    })
    config.loading && Indicator.open({ spinnerType: 'double-bounce' })
  }

  afterResolveResponseHandler (response) {
    response.config.loading && Indicator.close()
  }

  beforeErrorResponseHandler (error) {
    error.config.loading && Indicator.close()
    let errorMsg = error.message
    if (_.isObject(error.response)) {
      if (_.isObject(error.response.data)) {
        errorMsg = error.response.data['errorMsg']
      } else if (_.isString(error.response.data)) {
        errorMsg = error.response.data
      }
    }
    helper.toast(errorMsg)
  }
}