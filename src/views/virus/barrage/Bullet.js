const $speed = Symbol('$speed')
const $minStep = Symbol('$minStep')
const $finished = Symbol('$finished')
const $width = Symbol('$width')
const $parentWidth = Symbol('$parentWidth')
const defaultImg = require('../../../assets/img/tfinance/avator-default.png')

class Bullet {

  [$speed] = 40; // 每秒移动的速度,单位px

  [$minStep] = 0.2; // 每条弹幕之间最少的间隔(以轨道宽度为基准)

  [$finished] = false; // 动画是否完成
  
  constructor(parent, data) {
    
    this.container = document.createElement('div')
    this.container.className = 'bullet-container'
    this.container.innerHTML = `
      <img class="headimg" src="${data.headimgurl ? data.headimgurl : defaultImg}"/>
      <div class="content">
        <p class="nick-name">${data.nickname}</p>
        <p>${data.msg}</p>
      </div>`
    parent.container.appendChild(this.container)

    this[$width] = this.container.getBoundingClientRect().width
    // 所属轨道的宽度
    this[$parentWidth] = parent.width

    let duration = ((this[$width] + this[$parentWidth]) / this[$speed]).toFixed(3)
    this.container.style.animation = `barrage ${duration}s linear`
    this.container.addEventListener('webkitAnimationEnd', () => {
      this[$finished] = true
    })
  }
  /**
   * 该弹幕是否完全显示
   *
   * @returns
   * @memberof Bullet
   */
  isFullShowed() {
    let right = this.container.getBoundingClientRect().right
    if (right <= this[$parentWidth] * (1 - this[$minStep])) {
      return true
    }
    return false
  }
  /**
   * 动画是否结束
   *
   * @returns
   * @memberof Bullet
   */
  isFinish() {
    return this[$finished]
  }
}
export default Bullet
