<template>
  <van-popup class="pwd-keyboard-popup" :class="{ 'has-logo': showLogo }" v-model="show" position="bottom"
    safe-area-inset-bottom close-on-popstate :overlay="overlay" :lock-scroll="false" v-clickoutside="clickoutside">
    <!-- 键盘图 -->
    <van-loading color="#1989fa" />
    <img v-if="type === 'complete'" class="pwd-keyboard-img" :src="imgSrc[completeImgType]" alt="">
    <img v-else class="pwd-keyboard-img" :src="imgSrc" alt="">
    <template v-if="showLogo">
      <!-- 隐藏tab -->
      <div class='hide-tab' @click="$emit('hide')"></div>
      <!-- 间隔 -->
      <div class='space-container' :class="type === 'complete' ? `complete-${completeImgType}` : ''"></div>
    </template>
    <!-- 键盘内容 -->
    <div class="pwd-keyboard-container" :class="type === 'complete' ? `complete-${completeImgType}` : ''">
      <div class='key-container'>
        <!-- 全键盘-->
        <template v-if="type === 'complete'">
          <div class='key-item' v-for="(item, index) in dataSource[type][completeImgType]" :key="index"
            :style="calKeyStyle(index)" @click="dealEvent(item)">
          </div>
        </template>
        <!--  数字、身份证键盘 -->
        <template v-else>
          <div class='key-item' v-for="(item, index) in dataSource[type]" :key="index" :style="calKeyStyle(index)"
            @click="dealEvent(item)">
          </div>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { typeOf } from 'utils/assist'
import clickoutside from './clickoutside'
import dataSource from './data'
const keyboardTypes = ['number', 'idcard', 'complete']

export default {
  props: {
    show: Boolean,
    imgSrc: { // 键盘真实图片源
      type: [String, Object],
      required: true,
      validator (val) {
        if (typeOf(val) === 'object') {
          if (!('lowercase' in val) || !('uppercase' in val) || !('number' in val)) {
            throw new Error(`请设置全键盘中小写字母、大写字母、数字分别对应的键盘图片`)
          }
        }
        return true
      }
    },
    type: { // 键盘的类型，支持数字键盘、身份证键盘和全键盘
      type: String,
      required: true,
      validator (val) {
        if (!keyboardTypes.includes(val)) {
          throw new RangeError(`键盘类型必须为${keyboardTypes.join('、')}中的一种`)
        }
        return true
      }
    },
    showLogo: { // 键盘是否展示LOGO区域
      type: Boolean,
      default: true
    },
    showConfirm: { // 当为数字键盘的时候，支持带或不带确认键
      type: Boolean,
      default: true
    },
    hideOnClickOutside: { // 点击外部时是否收起键盘
      type: Boolean,
      default: true
    },
    hideOnClickConfirm: { // 点击确认键时是否收起键盘
      type: Boolean,
      default: true
    },
    overlay: { // 是否有遮罩层
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      completeImgType: 'lowercase',
      dataSource
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.completeImgType = 'lowercase'
      }
    }
  },
  created () {

  },
  methods: {
    dealEvent ({ event, value, changeType } = {}) {
      if (!this.imgSrc) return
      switch (event) {
        case 'confirm':
          if (this.type !== 'number' || this.showConfirm) {
            if (this.hideOnClickConfirm) {
              this.$emit('hide')
            }
            this.$emit('confirm')
          }
          break
        case 'change':
          this.completeImgType = changeType
          break
        default:
          this.$emit(event, value)
      }
    },
    calKeyStyle (index) {
      let { type, completeImgType } = this
      if (type === 'complete' && completeImgType !== 'number') {
        if (index <= 18) {
          return `left:${(75 * (index % 10) + parseInt(index / 10) * 37) / 750 * 100}vw;top:${parseInt(index / 10) * 13.6}vw;width: 8.53vw;height: 10.533vw;`
        } else if (index === 19 || index === 27) {
          return `left: ${parseInt(index / 20) * 86.67}vw; top: 27.2vw; width: 11.867vw; height: 10.533vw;`
        } else if (index <= 26) {
          return `left: ${(112 + (index % 20) * 75) / 750 * 100}vw; top: 27.2vw; width: 8.533vw;height: 10.533vw;`
        } else if (index === 28 || index === 29) {
          return `left: ${parseInt(index / 29) * 28.267}vw; top: 40.8vw; width: 26.8vw;height: 10.533vw;`
        } else {
          return `left: 56.53vw; top: 40.8vw; width: 41.6vw;height: 10.533vw;`
        }
      } else {
        return `left:${index % 3 * 33.6}vw;top:${parseInt(index / 3) * 13.733}vw;width: 32.93vw;height: 13.06vw;`
      }
    },
    clickoutside () {
      if (this.hideOnClickOutside) {
        this.$emit('hide')
      }
      this.$emit('outside')
    }
  },
  directives: {
    clickoutside
  }
}
</script>

<style lang="scss" scope>
.pwd-keyboard-popup {
  &.has-logo{
    height: 410px;
  }
  .van-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .pwd-keyboard-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &.has-logo {
    padding-top: 8.667vw;
  }
  .hide-tab {
    position: absolute;
    right: 0;
    top: 0;
    width: 16vw;
    height: 8.667vw;
    z-index: 2;
  }
  .space-container {
    height: 1.2vw;
    &.complete-lowercase,
    &.complete-uppercase {
      height: 0.9334vw;
    }
  }
  .pwd-keyboard-container {
    position: relative;
    box-sizing: border-box;
    height: 54.133vw;
    display: flex;
    z-index: 3;
    overflow: hidden;
    &.complete-lowercase,
    &.complete-uppercase {
      height: 54.4vw;
      padding: 1.6vw 0.8vw;
    }
    .key-container {
      position: relative;
      flex: 1;
    }
    .key-item {
      position: absolute;
      &:active {
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background: rgba(173, 173, 173, 0.1);
        }
      }
    }
  }
}
</style>