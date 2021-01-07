import sysConfig from 'src/utils/constant'
import helper from 'src/utils/helper'
import encrypt from 'src/utils/encrypt'
import { typeOf, deepCopy } from 'utils/assist'
import loading from 'utils/loading'

let HttpEngine = (require(`core/plugins/http/HttpEngine.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`)).default
export default class HttpForApplication extends HttpEngine {

  baseURL = sysConfig.httpBaseUrl[process.env.NODE_ENV];
  timeout = 30
  mockTimeout = 2;
  requestedSever = false;

  beforeSendRequestHandler (config) {
    let { jsessionId, apppartner, entId } = helper.getUserInfo('', {})
    config.headers = Object.assign(config.headers, {
      'jsession-id': jsessionId,
      'route-name': window.router.app._route.name,
      'apppartner': apppartner,
      'ent-id': entId
    })
    // 加密签名处理
    this.dealEncrypt(config)

    if (config.loading) {
      let loadingConfig = {}
      if (typeOf(config.loading) === 'object') {
        loadingConfig = config.loading
      } else {
        loadingConfig = { type: typeOf(config.loading) === 'boolean' ? 'bounce' : config.loading }
      }
      this.loadingHash = loading.show(loadingConfig)
    }
  }

  dealEncrypt (config) {
    let data
    if (config.method === 'post') {
      data = deepCopy(config.data)
    } else { 
      data = ''
    }
    let { encodeKey, timestamp, reqId, sha256Sign, encryptBizData } = encrypt.httpEncrypt(data, config.method, config.baseURL)
    config.headers = Object.assign(config.headers, {
      'plat-id': 'fx-payroll',
      'req-id': reqId,
      'encode-key': encodeKey,
      'timestamp': timestamp,
      'sha256-sign': sha256Sign
    })
    if (config.method === 'post') {
      config.data = { encryptBizData }
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
