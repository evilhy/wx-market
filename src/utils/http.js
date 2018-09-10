import axios from 'axios'
import constant from './constant'
import { typeOf } from './assist'
import vConsole from './console'
import helper from './helper'
import { Indicator } from 'mint-ui'

export default {
  dealLoading (isLoading, isOpen) {
    if (!isLoading) { return }
    isOpen ? Indicator.open({ spinnerType: 'double-bounce' }) : Indicator.close()
  },
  connect (isLoading = false, urlKey) {
    let http = this
    let baseUrl = constant.http_base_url[constant.node_env] ? constant.http_base_url[constant.node_env] : ''
    if (typeOf(urlKey) === 'string' && Object.keys(constant.http_base_url).includes(urlKey)) {
      baseUrl = constant.http_base_url[urlKey]
    }
    let instance = axios.create({
      baseURL: baseUrl,
      header: constant.http_headers,
      timeout: constant.http_timeout
    })
    let params = {}
    // request拦截
    instance.interceptors.request
      .use(function (config) {
        // 本地mock使用get方式
        if (constant.node_env === 'mock' && config.method === 'post') {
          config.method = 'get'
        }
        // 显示加载
        http.dealLoading(isLoading, true)

        if (typeOf(config.data) !== 'object') {
          config.data = {}
        }
        config.data = Object.assign(config.data, {
          // token: helper.getUserInfo('token')
        })
        params = config.data
        return config
      }, function (error) {
        // 关闭加载
        http.dealLoading(isLoading, false)

        helper.toast(constant.http_fail_message)
        return Promise.reject(error)
      })

    // response拦截
    instance.interceptors.response
      .use(function (response) {
        // 关闭加载
        http.dealLoading(isLoading, false)
        // 打印
        vConsole.log('--------------------------------------')
        vConsole.log('请求地址：', response.config.url)
        vConsole.log('请求参数：', params)
        vConsole.log('响应数据：', response.data)
        // 状态码不正常
        if (response.data.ret_code !== '0000') {
          // 登录超时
          if (response.data.ret_code === 'T990') {
            helper.logout()
          }
          if (Object.keys(constant.error_info).includes(response.data.ret_code)) {
            helper.toast(constant.error_info[response.data.ret_code])
          } else {
            helper.toast(response.data.ret_msg)
          }
        }
        return response.data
      }, function (error) {
        http.dealLoading(isLoading, false)
        helper.toast(constant.http_fail_message)
        return Promise.reject(error)
      })
    return instance
  },
  all (isLoading = false, options) {
    let promiseList = options.map((item) => {
      return this.connect(isLoading).post(item.url, item.params)
    })
    return new Promise((resolve, reject) => {
      axios
        .all(promiseList)
        .then(axios.spread((...result) => {
          resolve(result)
        }))
        .catch((error) => {
          vConsole.log(error)
        })
    })
  }
}
