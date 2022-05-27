import getJsapiSignatureById from './json/weixin.getJsapiSignatureById.json'
export default {
  openApi: [
    {
      baseURL: 'https://sitgateway.cardpu.com/payroll',
      paths: {
        '/weixin/getJsapiSignatureById': {
          get: getJsapiSignatureById
        }
      }
    }
  ],
  unknown: {}
}
