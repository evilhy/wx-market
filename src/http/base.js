import sysConfig from 'src/utils/constant'
import helper from 'src/utils/helper'
import encrypt from 'src/utils/encrypt'
import { typeOf, deepCopy } from 'utils/assist'
import loading from 'utils/loading'

let HttpEngine = (require(`core/plugins/http/HttpEngine.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`)).default
export default class HttpForApplication extends HttpEngine {

  baseURL = sysConfig.http_base_url[process.env.NODE_ENV];
  timeout = 30
  mockTimeout = 2;
  requestedSever = false;

  beforeSendRequestHandler (config) {
    let { jsessionId, apppartner } = helper.getUserInfo('', {})
    let data
    if (config.method === 'post') {
      data = deepCopy(config.data)
    } else { 
      data = ''
    }
    let { encodeKey, timestamp, reqId, sha256Sign, encryptBizData } = encrypt.httpEncrypt(data, config.method)
    config.headers = Object.assign(config.headers, {
      'jsession-id': jsessionId,
      'req-id': reqId,
      'route-name': window.router.app._route.name,
      'apppartner': apppartner,
      'encode-key': encodeKey,
      'timestamp': timestamp,
      'sha256-sign': sha256Sign
    })
    if (config.method === 'post') {
      config.data = { encryptBizData }
    }
    if (config.loading) {
      let loadingType = typeOf(config.loading) === 'boolean' ? 'square' : config.loading
      this.loadingHash = loading.show({ type: loadingType })
    }
  }

  afterResolveResponseHandler (response) {
    this.loadingHash && loading.hide(this.loadingHash)
  }

  afterRejectResponseHandler (error) {
    this.loadingHash && loading.hide(this.loadingHash)
    let errorMsg = error.message
    if (errorMsg === 'Network Error') {
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }
    let response = error.response
    if (typeOf(response) === 'object') {
      if (typeOf(response.data) === 'object') {
        errorMsg = response.data['error_msg']
      } else if (typeOf(response.data) === 'string') {
        errorMsg = response.data
      }
    }
    helper.toast(errorMsg)
  }
}