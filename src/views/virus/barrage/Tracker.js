import Bullet from './Bullet'

const $bullets = Symbol('$bullets')

class Tracker {
  [$bullets] = [] // 当前轨道中的弹幕集合

  constructor(parent) {
    this.container = document.createElement('div')
    this.container.className = 'tracker-container'
    parent.container.appendChild(this.container)
    this.width = parent.width
  }

  /**
   * 检查当前轨道是否可以放入新的弹幕
   *
   * @returns
   * @memberof Tracker
   */
  usable() {
    let bullets = this[$bullets]
    return !bullets.length || bullets[bullets.length - 1].isFullShowed()
  }

  /**
   * 向轨道中放入弹幕
   *
   * @param {Object|String} data
   * @memberof Tracker
   */
  fillBullet(data) {
    let firstBullet = this[$bullets][0]
    if (firstBullet && firstBullet.isFinish()) {
      this.container.removeChild(firstBullet.container)
      this[$bullets].shift(firstBullet)
    }

    let bullet = new Bullet(this, data)
    this[$bullets].push(bullet)
  }
}
export default Tracker
