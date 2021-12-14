import DebugEngine from './DebugEngine'
import { typeOf } from './Utils'

const $errorMessage = Symbol('errorMessage')

export default class DebugFail extends DebugEngine {
  constructor() {
    super()
    this.printMethod = 'error'
  }

  [$errorMessage] = ''

  set message(value) {
    if (typeOf(value) !== 'string') throw new TypeError('DebugFail.message 类型应为 String')
    this[$errorMessage] = value
  }

  getCollectionInfo() {
    const collection = super.getCollectionInfo()
    return collection.concat([{ title: '错误信息', content: this[$errorMessage] }])
  }
}
