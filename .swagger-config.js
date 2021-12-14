import demoData from './json/test.json'
import getJsapiSignature from './json/weixin.getJsapiSignature.json'
export default {
  openApi: [
    {
      baseURL: 'http://test.com',
      paths: {
        '/test': {
          get: demoData
        },
        '/weixin/getJsapiSignature': {
          get: getJsapiSignature
        }
      }
    }
  ],
  unknown: {}
}
