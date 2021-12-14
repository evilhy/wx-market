import dealFixedInput from 'directives/deal-fixed-input'
import loading from 'directives/loading'
import noResult from 'directives/no-result'
import SvgIcon from 'components/svgIcon/index.vue'
import { camelCase, upperFirst } from 'utils/assist'
import Filter from './filter'

const requireHttp = require.context('../apis', false, /[^./base].*\.js$/)

const install = (app, opts) => {
  requireHttp.keys().forEach((fileName) => {
    const name = upperFirst(
      camelCase(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    app.config.globalProperties[`$${name}`] = requireHttp(fileName).default || requireHttp(fileName)
  })


  let filter = {}
  Object.entries(Filter).forEach(([key, value]) => {
    filter[key] = value
  })

  app.config.globalProperties.$filter = filter

  app.directive('input', dealFixedInput).directive('loading', loading).directive('no-result', noResult)

  app.component('svg-icon', SvgIcon)
}

export default { install }
