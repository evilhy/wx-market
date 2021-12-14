import DebugEngine from './DebugEngine'

export default class DebugOk extends DebugEngine {
  constructor() {
    super()
    this.printMethod = 'log'
  }
}
