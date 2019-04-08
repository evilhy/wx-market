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
  mockTimeout = 5
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
    setTimeout(() => {
      response.config.loading && Indicator.close()
    }, 300)
  }

  beforeErrorResponseHandler (error) {
    let errorMsg = error.message
    if (errorMsg === 'Network Error') { 
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }
    let response = error.response
    if (typeOf(response) === 'object') {
      setTimeout(() => {
        response.config.loading && Indicator.close()
      }, 300)
      if (typeOf(response.data) === 'object') {
        errorMsg = response.data['error_msg']
      } else if (typeOf(response.data) === 'string') {
        errorMsg = response.data
      }
    }
    helper.toast(errorMsg)
  }
}