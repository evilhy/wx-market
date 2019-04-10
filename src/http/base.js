import sysConfig from 'src/utils/constant'
import helper from 'src/utils/helper'
import UUID from 'src/utils/uuid'
import { typeOf } from 'utils/assist'
import { Indicator } from 'mint-ui'

const processEnv = process.env
let HttpEngine = (require(`core/plugins/http/HttpEngine.${processEnv.HTTP_ENV}`)).default
export default class HttpForApplication extends HttpEngine {

  baseURL = sysConfig.http_base_url[sysConfig.node_env];
  mockTimeout = 2;
  requestedSever = false;
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

  afterRejectResponseHandler (error) {
    let errorMsg = error.message
    if (errorMsg === 'Network Error') { 
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }
    let response = error.response
    if (typeOf(response) === 'object') {
      response.config.loading && Indicator.close()
      if (typeOf(response.data) === 'object') {
        errorMsg = response.data['error_msg']
      } else if (typeOf(response.data) === 'string') {
        errorMsg = response.data
      }
    }
    helper.toast(errorMsg)
  }
}