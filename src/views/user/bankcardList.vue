<template>
  <div class="bankcard-list-page">
    <div class="swiper-wrap">
      <swiper v-if="banks.length >0" class="my-swiper" :options="swiperOption">
        <swiper-slide v-for="(item, index) in banks" :key="index">
          <div class="name">{{item.issuerName}}</div>
          <div class="account">
            <span class="value" v-if="!item.eyeFlag">{{item.cardNo | bankSpace}}</span>
            <span class="value star" v-if="item.eyeFlag">{{item.cardNo | accountStar}}</span>
            <span class="label" @click="item.eyeFlag = !item.eyeFlag">
             <i class="icon-ai44 iconfont" v-show="!item.eyeFlag"></i>
             <i class="icon-ai47 iconfont" v-show="item.eyeFlag"></i>
           </span>
          </div>
          <div class="tip"><span>该账户为</span>【{{item.entName}}】<span>添加的指定收款账户</span></div>
          <div class="mark">
            <img v-if="item.cardUpdStatus === 0" src="../../assets/img/user/icon-examine.png" alt="">
            <img v-else src="../../assets/img/user/icon-normal.png" alt="">
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="indicator">
      <div class="desc">我的工资卡</div>
      <div class="s-pagination"> </div>
    </div>
    <van-cell-group>
      <van-cell is-link @click="toEdit">
        <template #title>
          <div class="cell-title">
            <img class="edit" src="../../assets/img/user/icon-edit.png" alt="">
            <span :class="['name', banks[activeIndex] && banks[activeIndex].cardUpdStatus === 0 ? 'disabled' : '']">申请修改</span>
            <img v-if="banks[activeIndex] && banks[activeIndex].cardUpdStatus === 0" class="icon" src="../../assets/img/user/icon-iscommit.png" alt="">
          </div>
        </template>
      </van-cell>
      <van-cell is-link @click="toHistory">
        <template #title>
          <div class="cell-title">
            <img  class="record" src="../../assets/img/user/icon-record.png" alt="">
            <span class="name">修改记录</span>
            <img v-if="banks[activeIndex] && banks[activeIndex].isNew" class="icon" src="../../assets/img/user/icon-new.png" alt="">
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import decryptInfo from 'utils/decryptInfo'
import collect from 'utils/collect'
import storage from 'utils/storage'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      activeIndex: 0,
      banks: []
    }
  },
  computed: {
    swiperOption({activeIndex, banks}) {
      return {
        watchSlidesProgress: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: banks.length > 2,
          loopedSlides: 5,
          pagination: {
          el: '.s-pagination',
            bulletClass: 'number',
            type: 'custom',
            clickable: true,
            renderCustom(swiper, current, total) {
            activeIndex = current - 1
            let html = ''
            for (let i = 1; i <= total; i++) {
              if (current === i) {
                if (banks[i - 1].isNew) {
                  html += `<div class="number active">${i}<div class="dot"></div></div>`
                } else {
                  html += `<div class="number active">${i}</div>`
                }
              } else {
                if (banks[i - 1].isNew) {
                  html += `<div class="number">${i}<div class="dot"></div></div>`
                } else {
                  html += `<div class="number">${i}</div>`
                }
              }
            }
            return html
          }
        },
        on: {
          progress() {
            for (let i = 0; i < this.slides.length; i++) {
              let slide = this.slides.eq(i)
              let slideProgress = this.slides[i].progress
              let modify = 1
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
              }
              let translate = slideProgress * modify * 10 + 'px'
              let scale = 1 - Math.abs(slideProgress) / 5
              let zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
              slide.transform('translateX(' + translate + ') scale(' + scale + ')')
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0)
              }
            }
          },
          setTransition(transition) {
            for (let i = 0; i < this.slides.length; i++) {
              let slide = this.slides.eq(i)
              slide.transition(transition)
            }
          }
        }
      }
    }
  },
  created () {
    this.getBankList()
  },
  methods: {
    async getBankList () {
      let res = await this.$Roll.empCard()
      this.banks = decryptInfo(res.data, 'cardNo').map((item) => {
        return Object.assign(item, {eyeFlag: true})
      })
    },
    toHistory () {
      let ids = collect.getValueList(this.banks[this.activeIndex].bankCardGroups, 'id')
      storage.setSession('ids', ids.join('|'))
      this.$router.push({ name: 'bankcardHistory' })
    },
    toEdit() {
      if (this.banks[this.activeIndex] && this.banks[this.activeIndex].cardUpdStatus === 0) return
      storage.setSession('currentBank', this.banks[this.activeIndex])
      this.$router.push({ name: 'bankcardEdit' })
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
