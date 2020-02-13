import storage from 'utils/storage'
import Tracker from './Tracker'

const $timer = Symbol('$timer')
const $storageName = Symbol('$storageName')
const $autoPlay = Symbol('$autoPlay')
const $trackers = Symbol('$trackers')
const $data = Symbol('$data')
const createAnimateStyle = Symbol('createAnimateStyle')
const initData = Symbol('initData')

class Barrage {

  [$timer] = null; // 计时器
    
  [$storageName] = 'barrage-data'; // 弹幕数据缓存key

  constructor({ container, data = [], trackerCount = 3, autoPlay = true }) {
    this.container =
      typeof container === 'string'
        ? document.getElementById(container)
        : container
    this.container.classList.add('barrage-container')

    this.width = this.container.getBoundingClientRect().width
    this[$autoPlay] = autoPlay
    this[$trackers] = new Array(trackerCount).fill(1).map(() => {
      return new Tracker(this)
    })

    this[createAnimateStyle]()
    
    this[initData](data)

    if (this[$autoPlay] && this[$data].length) { 
      this.play()
    }
  }
  /**
   * 定时生成弹幕放入合适的轨道
   *
   * @memberof Barrage
   */
  play () {
    if (!Array.isArray(this[$data]) || !this[$data].length) return
    this[$timer] = setInterval(() => {
      for (let i = 0, len = this[$trackers].length; i < len; i++) {
        let tracker = this[$trackers][i]
        if (tracker.usable()) {
          tracker.fillBullet(this.getData().shift())
          return
        }
      }
    }, 500)
  }
  /**
   * 清除定时器
   *
   * @memberof Barrage
   */
  clearTimer() {
    clearInterval(this[$timer])
  }
  /**
   * 初始化数据
   *
   * @param {Array} data
   * @memberof Barrage
   */
  [initData] (data) {
    this[$data] = []
    storage.removeSession(this[$storageName])

    if (!Array.isArray(data)) return
    this[$data] = data
    storage.setSession(this[$storageName], data)
  }
  /**
   * 获取数据
   *
   * @returns
   * @memberof Barrage
   */
  getData() {
    if (!this[$data].length) {
      this[$data] = storage.getSession(this[$storageName], [])
    }
    return this[$data]
  }
  /**
   * 向前插入数据
   *
   * @param {Object|String|Array} data
   * @memberof Barrage
   */
  insertData (data) {
    if (typeof data === 'string' && !data.trim()) return
    if (!Array.isArray(data)) {
      data = [data]
    }
    this[$data].unshift(...data)
    let storeData = storage.getSession(this[$storageName], [])
    storeData.push(...data)
    storage.setSession(this[$storageName], storeData)
    if (!this[$timer] && this[$autoPlay]) {
      this.play()
    }
  }
  /**
   * 向后插入数据
   *  
   * @param {Array} data
   * @memberof Barrage
   */
  addData(data) {
    if (!Array.isArray(data) || !data.length) return
    this[$data].push(...data)
    let storeData = storage.getSession(this[$storageName], [])
    storeData.push(...data)
    storage.setSession(this[$storageName], storeData)
  }
  /**
   * 设置动画样式
   *
   * @memberof Barrage
   */
  [createAnimateStyle]() {
    let style = document.createElement('style')
    style.innerHTML = `
      @keyframes barrage{
        from{
          visibility: visible;
          transform: translateX(${this.width}px);
        }
        to{
          visibility: visible;
          transform: translateX(-100%);
        }
      }
      @-webkit-keyframes barrage{
        from{
          visibility: visible;
          -webkit-transform: translateX(${this.width}px);
        }
        to{
          visibility: visible;
          -webkit-transform: translateX(-100%);
        }
      }
    `
    document.head.appendChild(style)
  }
}
export default Barrage
