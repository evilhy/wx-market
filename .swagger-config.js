const entEmp = require('./json/roll.entEmp.json')
module.exports = {
  openApi: [{
    baseURL: 'http://10.5.1.92:8080/rest',
    paths: {
      '/roll/entEmp': {
        get: entEmp
      }
    }
  }],
  unknown: {}
}
