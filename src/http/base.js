import sysConfig from 'src/utils/constant'
import helper from 'src/utils/helper'
import encrypt from 'src/utils/encrypt'
import UUID from 'utils/uuid'
import { typeOf, deepCopy } from 'utils/assist'
import Loading from 'utils/loading'

let HttpEngine = require(`core/plugins/http/HttpEngine.${process.env.VUE_APP_ENV === 'development' ? 'dev' : 'prod'}`).default
export default class HttpForApplication extends HttpEngine {
  constructor() {
    super()
    this.baseURL = sysConfig.httpBaseUrl[process.env.VUE_APP_ENV]

    this.timeout = 60

    this.mockTimeout = 2

    this.requestedSever = false

    this.encrypt = true
  }

  beforeSendRequestHandler(config) {
    let { jsessionId, apppartner, entId } = helper.getUserInfo('', {})
    config.headers = Object.assign(config.headers, {
      'jsession-id': jsessionId,
      'route-name': window.router.app._route.name,
      apppartner,
      'ent-id': entId,
      'plat-id': 'fx-payroll',
      'req-id': UUID.createUUID()
    })
    // 加密签名处理
    config.encrypt && this.dealEncrypt(config)
    if (config.loading) {
      let loadingConfig = { parent: document.querySelector('#app') }
      if (typeOf(config.loading) === 'object') {
        loadingConfig = { ...loadingConfig, ...config.loading }
      } else {
        loadingConfig = { ...loadingConfig, type: typeOf(config.loading) === 'boolean' ? 'bounce' : config.loading }
      }
      this.loadingInstance = new Loading(loadingConfig)
    }
  }

  dealEncrypt(config) {
    let data
    if (config.method === 'post') {
      data = deepCopy(config.data)
      // log('-----------------body data:', data)
    } else {
      data = ''
    }
    console.log('data:', data)
    let { encodeKey, timestamp, reqId, sha256Sign, encryptBizData } = encrypt.httpEncrypt(data, config.method, config.baseURL)
    config.headers = Object.assign(config.headers, {
      'req-id': reqId,
      'encode-key': encodeKey,
      timestamp,
      'sha256-sign': sha256Sign
    })
    if (config.method === 'post') {
      config.data = { encryptBizData }
    }
  }

  afterResolveResponseHandler(response) {
    this.loadingInstance && this.loadingInstance.hide()
  }

  afterRejectResponseHandler(error) {
    this.loadingInstance && this.loadingInstance.hide()
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
        errorMsg = response.data.error_msg
      } else if (typeOf(response.data) === 'string') {
        errorMsg = response.data
      }
    }
    helper.toast(errorMsg)
  }
}
