import Http from './base'
class Upload {
  /**
   * @description 文件上传
   */
  upload({ baseURL, path, file, headers, data }) {
    let http = new Http()
    if (baseURL) {
      http.baseURL = baseURL
    }
    http.path = path
    http.headers = { ...headers, 'Content-Type': 'multipart/form-data' }
    const formData = new FormData()
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }
    formData.append('file', file)
    http.body = formData
    http.encrypt = false
    http.mockStatusCode = 500
    return http.post()
  }
}
export default new Upload()
