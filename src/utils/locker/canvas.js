class Canvas {
  /**
   * 画实心圆
   *
   * @param {*} ctx
   * @param {*} color
   * @param {*} x
   * @param {*} y
   * @param {*} r
   * @memberof Canvas
   */
  drawSolidCircle (ctx, color, x, y, r) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI, true)
    ctx.fill()
    ctx.closePath()
  }
  /**
   * 画空心圆
   *
   * @param {*} ctx
   * @param {*} color
   * @param {*} x
   * @param {*} y
   * @param {*} r
   * @memberof Canvas
   */
  drawHollowCircle (ctx, color, x, y, r) {
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI, true)
    ctx.stroke()
    ctx.closePath()
  }
  /**
   * 画线
   *
   * @param {*} ctx
   * @param {*} color
   * @param {*} x1
   * @param {*} y1
   * @param {*} x2
   * @param {*} y2
   * @memberof Canvas
   */
  drawLine (ctx, color, x1, y1, x2, y2) {
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }
  /**
   * 清除画布
   *
   * @param {*} canvas
   * @memberof Canvas
   */
  clearCanvas (canvas) { 
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}

export default new Canvas()