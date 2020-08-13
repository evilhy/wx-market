import { typeOf } from 'utils/assist'
import Canvas from './canvas'

const $defaultOptions = Symbol('$defaultOptions')
const $defaultCanvasStyle = Symbol('$defaultCanvasStyle')
const $rows = Symbol('$rows')
const $circles = Symbol('$circles')
const $container = Symbol('$container')
const $options = Symbol('$options')
const $baseCanvas = Symbol('$baseCanvas')
const $recordCanvas = Symbol('$recordCanvas')
const $tempCanvas = Symbol('$tempCanvas')
const $records = Symbol('$records')
const $touchFlag = Symbol('$touchFlag')
const getPointInCanvas = Symbol('getPointInCanvas')
const init = Symbol('init')
const setRadiusByBaseWidth = Symbol('setRadiusByBaseWidth')
const reset = Symbol('reset')
const bindEvnet = Symbol('bindEvnet')
const getDistance = Symbol('getDistance')
const afterDraw = Symbol('afterDraw')
/**
 * 手势密码
 * 传入container容器和配置项options
 * 手势不足时，调用afterDrawNotEnough方法,方法接收绘制的手势位置信息
 * 手势完成时，调用afterDrawFinished方法,方法接收绘制的手势位置信息
 * baseWidth、innerRadius、outerRadius等值，基于设计稿做改动
 * @export
 * @class Recorder
 */
export default class Recorder {
  [$defaultOptions] = {
    render: true, // 是否自动渲染
    minPoints: 4, // 最小密码点数
    color: '#363c4d', // 圆的颜色
    activeInnerColor: '#00cccc', // 按下时内心圆的颜色
    activeOuterColor: '#cdf5f5', // 按下时内心圆的颜色
    errorColor: 'red', // 错误时实心圆和空心圆的颜色
    outerRadius: 80, // 外心圆半径(设计稿)
    innerRadius: 30, // 内心圆半径(设计稿)
    baseWidth: 640 // 屏幕宽度基准值
  };
  // 圆的行数
  [$rows] = 3;
  // 圆的位置信息
  [$circles] = [];
  // 默认canvas样式
  [$defaultCanvasStyle] = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) scale(0.5)'
  }

  constructor(container, options = {}) {
    if (!container || container.nodeType !== 1) { throw new Error('请指定NODE节点类型的container容器') }
    if (typeOf(options) !== 'object') {
      throw new TypeError('options的类型必须为Object')
    }
    this[$container] = container
    this[$options] = { ...this[$defaultOptions], ...options }
    this[setRadiusByBaseWidth]()
    if (this[$options].render) {
      this.render()
    }
  }

  /**
   * 渲染canvas
   *
   * @returns
   * @memberof Recorder
   */
  render() {
    if (this[$baseCanvas]) return false
    let container = this[$container]

    let { width, height } = container.getBoundingClientRect()

    let baseCanvas = document.createElement('canvas')
    baseCanvas.width = baseCanvas.height = 2 * Math.min(width, height)
    Object.assign(baseCanvas.style, this[$defaultCanvasStyle])
    let tempCanvas = baseCanvas.cloneNode(true)
    let recordCanvas = baseCanvas.cloneNode(true)

    container.appendChild(recordCanvas)
    container.appendChild(tempCanvas)
    container.appendChild(baseCanvas)

    this[$baseCanvas] = baseCanvas
    this[$recordCanvas] = recordCanvas
    this[$tempCanvas] = tempCanvas

    this[init]()
  }
  /**
   * 初始化手势密码、绑定手势事件
   *
   * @memberof Recorder
   */
  [init] () {
    this[reset]()
    this[bindEvnet]()
  }
  /**
   * 重置手势canvas
   *
   * @memberof Recorder
   */
  [reset]() {
    let baseCanvas = this[$baseCanvas]
    let baseCtx = baseCanvas.getContext('2d')
    let width = baseCanvas.width
    let { color, outerRadius, innerRadius } = this[$options]
    Canvas.clearCanvas(baseCanvas)
    Canvas.clearCanvas(this[$recordCanvas])
    Canvas.clearCanvas(this[$tempCanvas])
    let space = Math.floor(
      (width - this[$rows] * 2 * outerRadius) / (this[$rows] + 1)
    )
    let circles = []
    for (let i = 1; i <= this[$rows]; i++) {
      for (let j = 1; j <= this[$rows]; j++) {
        let x = i * space + (2 * i - 1) * outerRadius
        let y = j * space + (2 * j - 1) * outerRadius
        Canvas.drawSolidCircle(baseCtx, color, x, y, innerRadius)
        circles.push({ x, y, pos: [i, j] })
      }
    }
    this[$circles] = circles
  }
  [setRadiusByBaseWidth] () {
    console.log(this[$container].getBoundingClientRect())
    let clientWidth = document.documentElement.clientWidth
    let { outerRadius, innerRadius, baseWidth } = this[$options]
    this[$options].outerRadius = (clientWidth / baseWidth) * outerRadius
    this[$options].innerRadius = (clientWidth / baseWidth) * innerRadius
  }
  /**
   * 绑定事件
   *
   * @memberof Recorder
   */
  [bindEvnet]() {
    let records = this[$records]
    let baseCanvas = this[$baseCanvas]
    let tempCanvas = this[$tempCanvas]
    let { outerRadius, innerRadius, activeInnerColor, activeOuterColor } = this[$options]
    let baseCtx = baseCanvas.getContext('2d')
    let recordCtx = this[$recordCanvas].getContext('2d')
    let tempCtx = tempCanvas.getContext('2d')
    baseCanvas.addEventListener('touchstart', e => {
      e.preventDefault()
      records = []
      let { clientX, clientY } = e.targetTouches[0]
      let circles = this[$circles]
      let touchPoint = this[getPointInCanvas](
        this[$baseCanvas],
        clientX,
        clientY
      )
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i]
        // 触摸点落在某个圆中
        if (this[getDistance](circle, touchPoint) < outerRadius) {
          this[$touchFlag] = true
          Canvas.drawSolidCircle(
            recordCtx,
            activeOuterColor,
            circle.x,
            circle.y,
            outerRadius
          )
          Canvas.drawSolidCircle(
            baseCtx,
            activeInnerColor,
            circle.x,
            circle.y,
            innerRadius
          )
          circles.splice(i, 1)
          records.push(circle)
          break
        }
      }
    })

    baseCanvas.addEventListener('touchmove', e => {
      if (!this[$touchFlag]) return false
      let { clientX, clientY } = e.targetTouches[0]
      let touchPoint = this[getPointInCanvas](
        this[$baseCanvas],
        clientX,
        clientY
      )
      let lastPoint = records[records.length - 1]
      let circles = this[$circles]
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i]
        // 触摸点落在某个圆中
        if (this[getDistance](circle, touchPoint) < outerRadius) {
          this[$touchFlag] = true
          Canvas.drawSolidCircle(
            recordCtx,
            activeOuterColor,
            circle.x,
            circle.y,
            outerRadius
          )
          Canvas.drawSolidCircle(
            baseCtx,
            activeInnerColor,
            circle.x,
            circle.y,
            innerRadius
          )
          if (records.length) {
            Canvas.drawLine(
              recordCtx,
              activeInnerColor,
              lastPoint.x,
              lastPoint.y,
              circle.x,
              circle.y
            )
          }
          circles.splice(i, 1)
          records.push(circle)
          break
        }
      }
      Canvas.clearCanvas(this[$tempCanvas])
      Canvas.drawLine(
        tempCtx,
        activeInnerColor,
        lastPoint.x,
        lastPoint.y,
        touchPoint.x,
        touchPoint.y
      )
    })
    baseCanvas.addEventListener('touchend', e => {
      if (!this[$touchFlag]) return false
      Canvas.clearCanvas(tempCanvas)
      this[afterDraw](records)
      this[$touchFlag] = false
      setTimeout(() => {
        this[reset]()
      }, 200)
    })
  }
  /**
   * 获取触摸点在canvas上的pos
   *
   * @param {*} canvas
   * @param {*} x
   * @param {*} y
   * @returns
   * @memberof Recorder
   */
  [getPointInCanvas](canvas, x, y) {
    let rect = canvas.getBoundingClientRect()
    return {
      x: 2 * (x - rect.left),
      y: 2 * (y - rect.top)
    }
  }
  /**
   * 获取两点之间的距离
   *
   * @param {*} point1
   * @param {*} point2
   * @returns
   * @memberof Recorder
   */
  [getDistance](point1, point2) {
    let x = point2.x - point1.x
    let y = point2.y - point1.y
    return Math.sqrt(x * x + y * y)
  }
  /**
   * 绘制完成的钩子函数
   *
   * @param {*} res
   * @memberof Recorder
   */
  [afterDraw](records) {
    if (records.length < this[$options].minPoints) {
      typeOf(this.afterDrawNotEnough) === 'function' &&
        this.afterDrawNotEnough(records)
    } else {
      typeOf(this.afterDrawFinished) === 'function' &&
        this.afterDrawFinished(records)
    }
  }
  /**
   * 绘制不足最少点数时回调函数
   *
   * @memberof Recorder
   */
  afterDrawNotEnough() {}
  /**
   * 绘制完成时回调函数
   *
   * @memberof Recorder
   */
  afterDrawFinished() {}
}
