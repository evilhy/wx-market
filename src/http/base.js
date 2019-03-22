import HttpEngine from 'core/plugins/http/HttpEngine'
import sysConfig from 'src/utils/constant'
import helper from 'src/utils/helper'
import UUID from 'src/utils/uuid'
import { typeOf } from 'utils/assist'
import { Indicator } from 'mint-ui'
export default class HttpForApplication extends HttpEngine {
  headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
  baseURL = sysConfig.http_base_url[sysConfig.node_env]
  mockTimeout = 1
  requestedSever = sysConfig.requested_sever
  beforeSendRequestHandler (config) {
    config.headers = Object.assign(config.headers, {
      'jsession-id': helper.getUserInfo('jsessionId', ''),
      'req-id': UUID.createUUID(),
      'route-name': window.router.app._route.name
    })
    config.loading && Indicator.open({ spinnerType: 'double-bounce' })
  }

  afterResolveResponseHandler (response) {
    response.config.loading && Indicator.close()
  }

  beforeErrorResponseHandler (error) {
    error.config.loading && Indicator.close()
    let errorMsg = error.message
    if (errorMsg === 'Network Error') { 
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }
    if (typeOf(error.response) === 'object') {
      if (typeOf(error.response.data) === 'object') {
        errorMsg = error.response.data['error_msg']
      } else if (typeOf(error.response.data) === 'string') {
        errorMsg = error.response.data
      }
    }
    helper.toast(errorMsg)
  }
}