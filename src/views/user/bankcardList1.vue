<template>
  <div class="bankcard-list-page1">
    <swiper ref="mySwipe" class="my-swipe" :options="swiperOption">
      <swiper-slide v-for="(item, index) in banks" :key="index">
       <div class="wrap">
         <div class="name">{{item.issuerName}}</div>
         <div class="account">
           <span class="value" v-if="!eyeFlag">{{item.cardNo | bankSpace}}</span>
           <span class="value star" v-if="eyeFlag">{{item.cardNo | star}}</span>
           <span class="label" @click="eyeFlag = !eyeFlag">
             <i class="icon-ai44 iconfont" v-show="!eyeFlag"></i>
             <i class="icon-ai47 iconfont" v-show="eyeFlag"></i>
           </span>
         </div>
         <div class="tip"><span>该账户为</span>【{{item.entName}}】<span>添加的指定收款账户</span></div>
         <div class="mark">
           <img v-if="item.cardUpdStatus === 0" src="../../assets/img/user/icon-examine.png" alt="">
           <img v-else src="../../assets/img/user/icon-normal.png" alt="">
         </div>
       </div>
     </swiper-slide>
     <!-- <div class="indicator" slot="pagination">
        &lt;!&ndash;<div class="desc">我的工资卡</div>&ndash;&gt;
        &lt;!&ndash;<div class="number">1</div>
        <div class="number active">2</div>
        <div class="number">3</div>
        <div class="number">4
          <div class="dot"></div>
        </div>&ndash;&gt;
      </div>-->

    </swiper>
    <div class="indicator">
      <div class="desc">我的工资卡</div>
      <div :class="['number', activeIndex === index ? 'active': '']" v-for="(item, index) in banks" :key="index">
        {{index + 1}}
        <div v-if="item.isNew" class="dot"></div>
      </div>
      <!--<div class="number active">2</div>
      <div class="number">3</div>
      <div class="number">4
        <div class="dot"></div>
      </div>-->
    </div>
    <van-cell-group>
      <van-cell is-link @click="toEdit">
        <template #title>
          <div class="cell-title">
            <img class="edit" src="../../assets/img/user/icon-edit.png" alt="">
            <span class="name">申请修改</span>
          </div>
        </template>
      </van-cell>
      <van-cell is-link @click="toHistory">
        <template #title>
          <div class="cell-title">
            <img  class="record" src="../../assets/img/user/icon-record.png" alt="">
            <span class="name">修改记录</span>
            <img v-if="banks[activeIndex] && banks[activeIndex].isNew" class="new" src="../../assets/img/user/icon-new.png" alt="">
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import bankItem from './bankItem'
import decryptInfo from 'utils/decryptInfo'
import collect from 'utils/collect'
import storage from 'utils/storage'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    let vm = this
    return {
      eyeFlag: true,
      activeIndex: 0,
      banks: [],
      swiperOption: {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
       // loop: true,
       // loopedSlides: 5,
      //  autoplay: true,
       /* pagination: {
         // el: '.indicator'
         // bulletClass: 'number',
         // type: 'custom',
          /!* renderCustom(swiper, current, total) {
            console.log(swiper)
            console.log(current)
            console.log(total)
            console.log(this.banks)
            let html = '<div class="desc">我的工资卡</div>'
            for (let i = 1; i <= total; i++) {
              if (current === i) {
                html += `<div class="number active">${i}</div>`
              } else {
                html += `<div class="number">${i}</div>`
              }

            }
            return html
          } *!/
        }, */
        on: {
          slideChange() {
            vm.activeIndex = this.activeIndex
          },
          progress() {
              for (let i = 0; i < this.slides.length; i++) {
              let slide = this.slides.eq(i)
              let slideProgress = this.slides[i].progress
              let modify = 1
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
              }
              let translate = slideProgress * modify * 85 + 'px'
              let scale = 1 - Math.abs(slideProgress) / 5
              let zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
              slide.transform('translateX(' + translate + ') scale(' + scale + ')')
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (Math.abs(slideProgress) > 1) {
                slide.css('opacity', 0)
              }
            }
          },
          setTransition (transition) {
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
    onChange(index) {
      this.current = index
    },
    async getBankList () {
      let res = await this.$Roll.empCard()
      this.banks = decryptInfo(res.data, 'cardNo')
    },
    toHistory () {
      let ids = collect.getValueList(this.banks[this.activeIndex].bankCardGroups, 'id')
      storage.setSession('ids', ids.join('|'))
      this.$router.push({ name: 'bankcardHistory' })
    },
    toEdit() {
      storage.setSession('currentBank', this.banks[this.activeIndex])
      this.$router.push({ name: 'bankcardEdit' })
    }
  },
  components: {
    bankItem,
    swiper,
    swiperSlide
  }
}
</script>
