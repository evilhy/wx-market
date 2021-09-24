<template>
  <div class="signature" :class="classes" :style="`--signature-color: ${theme};`">
    <canvas class="signature__canvas" :class="`${wClass}__canvas`"></canvas>
    <template v-if="visible">
      <!-- 提示语 -->
      <p class="signature__tips" :class="`${wClass}__tips`">为了签字有效，请务必横屏签名！</p>
      <img class="signature__img" :class="`${wClass}__img`" :src="signImgData" alt="" />
      <!-- 操作按钮 -->
      <div class="signature__actions" :class="`${wClass}__actions`">
        <van-button type="info" plain @click.stop="close">返回</van-button>
        <van-button type="info" plain @click.stop="clear">清除重写</van-button>
        <van-button type="info" :loading="loading" @click.stop="sure">确认提交 </van-button>
      </div>
    </template>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'
import helper from 'utils/helper.js'

export default {
  name: 'Signature',
  components: {},
  props: {
    theme: {
      // 主题颜色
      type: String,
      default: '#1989fa'
    },
    emptyTip: {
      // 没有签名时的提示
      type: String,
      default: '请签名'
    },
    cut: {
      // 是否裁剪只保留签名区
      type: Boolean,
      default: false
    },
    viewportWidth: {
      // postcss-px-to-viewport中viewportWidth
      type: Number,
      default: 375
    }
  },
  data() {
    return {
      visible: false,
      canvas: null,
      signaturePad: null,
      signImgData: '',
      ratio: Math.max(window.devicePixelRatio || 1, 1),
      screenDirection: 'v',
      loading: false
    }
  },
  computed: {
    wClass() {
      return [`signature--${this.viewportWidth}`]
    },
    classes() {
      let result = [`signature--${this.viewportWidth}`]
      if (this.visible) {
        result.push(`signature--visible`)
        result.push(`signature--${this.viewportWidth}--visible`)
      }
      return result
    }
  },
  watch: {},
  created() {
    this.listenScreen()
  },
  mounted() {},
  methods: {
    open() {
      this.visible = true
      this.$nextTick(() => {
        // 初始化
        this.initSignPag()
      })
    },
    initSignPag() {
      window.document.body.scrollTop = 0
      let canvas = document.querySelector('.signature__canvas')
      this.canvas = canvas
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // 自适应高清屏幕
      this.scaleCanvas(canvas, this.ratio)
      this.signaturePad = new SignaturePad(canvas, {
        penColor: 'rgb(0, 0, 0)'
      })
      this.signaturePad.clear()
    },
    scaleCanvas(canvas, ratio) {
      canvas.width *= ratio
      canvas.height *= ratio
      canvas.getContext('2d').scale(ratio, ratio)
    },
    async sure() {
      // 是否签名
      if (this.signaturePad.isEmpty()) {
        helper.toast({ message: this.emptyTip, duration: 3000, getContainer: '.signature' })
        return
      }
      try {
        this.loading = true
        this.signImgData = this.signaturePad.toDataURL('image/png')
        // 检测是否旋转
        await this.checkImageRotate()
        this.$emit('finish', this.signImgData)
        this.close()
      } catch (e) {
        this.loading = false
      }
    },
    clear() {
      this.signImgData = ''
      this.signaturePad.clear()
    },
    close() {
      this.clear()
      this.loading = false
      this.visible = false
      this.$emit('close')
    },
    async checkImageRotate() {
      if (this.screenDirection === 'v') {
        await this.loadImage(this.signImgData)
        let { width, height } = this.canvas
        this.roateImage(height, width, -90)
        this.signImgData = this.cut ? this.cutSignatureCanvas(this.canvas) : this.signaturePad.toDataURL('image/png')
      }
    },
    loadImage(imgData) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = imgData
        img.onload = () => {
          resolve(imgData)
        }
        img.onerror = () => reject(new Error(`${imgData} load error`))
      })
    },
    roateImage(width, height, degree) {
      const d = (degree * Math.PI) / 180
      const rotationCanvas = this.canvas
      const surfaceContext = this.canvas.getContext('2d')
      const image = document.querySelector('.signature__img')
      rotationCanvas.width = width
      rotationCanvas.height = height
      // 清除一个画布上的矩形
      surfaceContext.clearRect(0, 0, width, height)
      // 保存状态
      surfaceContext.save()
      // 设置矩形为横屏的中心的位置
      surfaceContext.translate(width * 0.5, height * 0.5)
      // 旋转角度；进度全屏后是90度，具体配置值需要(degree * Math.PI) / 180计算
      surfaceContext.rotate(d)
      // 向画布上绘制图像
      surfaceContext.drawImage(image, -height / 2, -width / 2)
      // 返回之前保存过的路径状态和属性
      surfaceContext.restore()
    },
    cutSignatureCanvas(canvas) {
      // 复制画布 避免影响之前的画布
      let croppedCanvas = document.createElement('canvas')
      let croppedCtx = croppedCanvas.getContext('2d')

      croppedCanvas.width = canvas.width
      croppedCanvas.height = canvas.height
      croppedCtx.drawImage(canvas, 0, 0)

      // 处理画布空白
      let w = croppedCanvas.width
      let h = croppedCanvas.height
      let pix = { x: [], y: [] }
      let imageData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height) // 获取canvas像素数据
      let x
      let y
      let index
      for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
          index = (y * w + x) * 4 + 3 // 根据行、列读取某像素点的R/G/B/A值的公式：
          if (imageData.data[index] > 0) {
            pix.x.push(x)
            pix.y.push(y)
          }
        }
      }

      pix.x.sort(function (a, b) {
        return a - b
      })
      pix.y.sort(function (a, b) {
        return a - b
      })
      let n = pix.x.length - 1

      w = pix.x[n] - pix.x[0]
      h = pix.y[n] - pix.y[0]
      let cut = croppedCtx.getImageData(pix.x[0], pix.y[0], w, h)

      croppedCanvas.width = w
      croppedCanvas.height = h
      croppedCtx.putImageData(cut, 0, 0)
      return croppedCanvas.toDataURL('image/png')
    },
    listenScreen() {
      window.addEventListener(
        'onorientationchange' in window ? 'orientationchange' : 'resize',
        () => {
          if (window.orientation === 180 || window.orientation === 0) {
            this.screenDirection = 'v'
            setTimeout(() => {
              this.initSignPag()
            }, 200)
          }
          if (window.orientation === 90 || window.orientation === -90) {
            this.screenDirection = 'h'
            setTimeout(() => {
              this.initSignPag()
            }, 200)
          }
        },
        false
      )
    }
  }
}
</script>
<style lang="scss">
.signature {
  position: fixed;
  left: 0;
  top: 0;
  width: 0%;
  height: 0%;
  background: white;
  z-index: 2;
  &--visible {
    width: 100%;
    height: 100%;
    .signature__canvas {
      border: 1px dashed var(--signature-color);
    }
  }
  &__canvas {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    background: #f8f8f8;
  }
  &__tips {
    position: absolute;
    border-radius: 4px;
    margin-right: 14px;
    color: var(--signature-color);
  }
  &__img {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  &__actions {
    position: absolute;
    display: flex;
    .van-button {
      flex: 1;
      background-color: var(--signature-color);
      border-color: var(--signature-color);
      &--plain {
        background-color: white;
        color: var(--signature-color);
      }
    }
    .van-button + .van-button {
      margin-left: 10px;
    }
  }
}

.signature--375 {
  &__canvas {
    border-radius: 4px;
  }
  &__tips {
    border-radius: 4px;
    margin-right: 14px;
  }
  &__actions {
    .van-button {
      height: 44px;
      font-size: 15px;
    }
    .van-button + .van-button {
      margin-left: 10px;
    }
  }
}
.signature--750 {
  &__canvas {
    border-radius: 8px;
  }
  &__tips {
    border-radius: 8px;
    margin-right: 28px;
  }
  &__actions {
    .van-button {
      height: 88px;
      font-size: 28px;
    }
    .van-button + .van-button {
      margin-left: 20px;
    }
  }
}
.signature--640 {
  &__canvas {
    border-radius: 7px;
  }
  &__tips {
    border-radius: 7px;
    margin-right: 24px;
  }
  &__actions {
    .van-button {
      height: 75px;
      font-size: 26px;
    }
    .van-button + .van-button {
      margin-left: 17px;
    }
  }
}
@media screen and (orientation: portrait) {
  .signature {
    &__tips {
      right: 0;
      top: 50%;
      transform: translateX(50%) translateY(-50%) rotate(90deg);
    }
    &__actions {
      transform: rotate(90deg);
      transform-origin: top left;
    }
    .van-toast {
      transform: translate3d(-50%, -50%, 0) rotate(90deg);
    }
  }
  .signature--375 {
    &--visible {
      padding: 5px 30px 5px 55px;
    }
    &__tips {
      font-size: 14px;
    }
    &__actions {
      left: 5px;
      top: 5px;
      width: calc(100vh - 10px);
      margin-left: 44px;
    }
    .van-toast {
      font-size: 14px !important;
    }
  }
  .signature--750 {
    &--visible {
      padding: 10px 60px 10px 110px;
    }
    &__tips {
      font-size: 28px;
    }
    &__actions {
      left: 10px;
      top: 10px;
      width: calc(100vh - 20px);
      margin-left: 88px;
    }
    .van-toast {
      min-width: 100px;
      padding: 20px;
      font-size: 26px !important;
    }
  }
  .signature--640 {
    &--visible {
      padding: 8.5px 51px 8.5px 94px;
    }
    &__tips {
      font-size: 24px;
    }
    &__actions {
      left: 8.5px;
      top: 8.5px;
      width: calc(100vh - 17px);
      margin-left: 75px;
    }
    .van-toast {
      min-width: 100px;
      padding: 20px;
      font-size: 24px !important;
    }
  }
}
@media screen and (orientation: landscape) {
  .signature {
    &__tips {
      width: 100%;
      left: 0;
      text-align: center;
    }
    .van-toast {
      line-height: 1;
    }
  }
  .signature--375 {
    &--visible {
      padding: 18px 5px 40px 5px;
    }
    &__tips {
      top: 2px;
      font-size: 10px;
    }
    &__actions {
      width: calc(100vw - 10px);
      left: 5px;
      bottom: 5px;
      .van-button {
        height: 30px;
        font-size: 10px;
      }
    }
    .van-toast {
      padding: 8px 10px;
      min-width: 40px;
      font-size: 10px;
      border-radius: 4px;
    }
  }
  .signature--750 {
    &--visible {
      padding: 36px 10px 80px 10px;
    }
    &__tips {
      top: 4px;
      font-size: 20px;
    }
    &__actions {
      width: calc(100vw - 20px);
      left: 10px;
      bottom: 10px;
      .van-button {
        height: 60px;
        font-size: 20px;
      }
    }
    .van-toast {
      padding: 16px 20px;
      min-width: 80px;
      font-size: 20px;
      border-radius: 8px;
    }
  }
  .signature--640 {
    &--visible {
      padding: 31px 8.5px 68px 8.5px;
    }
    &__tips {
      top: 3.5px;
      font-size: 17px;
    }
    &__actions {
      width: calc(100vw - 17px);
      left: 8.5px;
      bottom: 8.5px;
      .van-button {
        height: 51px;
        font-size: 18px;
      }
    }
    .van-toast {
      padding: 13.6px 17px;
      min-width: 68px;
      font-size: 17px;
      border-radius: 7px;
    }
  }
}
</style>
