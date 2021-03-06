import helper from 'utils/helper'
import encrypt from 'utils/encrypt'
import UUID from 'utils/uuid'
import { typeOf, deepCopy } from 'utils/assist'
import Loading from 'utils/loading'

let HttpEngine = require(`core/plugins/http/HttpEngine.${process.env.VUE_APP_ENV === 'development' ? 'dev' : 'prod'}`).default
export default class HttpForApplication extends HttpEngine {
  constructor() {
    super()
    this.baseURL = process.env.VUE_APP_HTTP_BASE_URL

    this.timeout = 60

    this.mockTimeout = 2

    this.requestedSever = false

    this.encrypt = false
  }

  beforeSendRequestHandler(config) {
    let { jsessionId, apppartner, entId } = helper.getUserInfo('', {})
    Object.assign(config.headers, {
      'jsession-id': jsessionId,
      'route-name': window.router.currentRoute.value.name,
      apppartner,
      'ent-id': entId,
      'req-id': UUID.createUUID()
    })
    // 加密签名处理
    config.encrypt && this.dealEncrypt(config)
    // loading
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
    } else {
      data = ''
    }
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
