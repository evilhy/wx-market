<template>
  <div class="bankcard-list-page">
    <template v-if="banks.length">
      <Carousel :class="{ single: banks.length === 1 }" v-model="activeIndex" :itemsToShow="banks.length > 1 ? 1.3 : 1" :wrapAround="true">
        <Slide v-for="(item, index) in banks" :key="index">
          <div class="name">{{ item.issuerName }}</div>
          <div class="account">
            <span class="value"
              v-show="!item.eyeFlag">{{ $filter.bankSpace(item.cardNo) }}</span>
            <span class="value"
              v-show="item.eyeFlag">{{ $filter.accountStar(item.cardNo) }}</span>
            <span class="label" extend-click
              @click.stop="item.eyeFlag = !item.eyeFlag">
              <svg-icon svg-name="eye-show" fill="white" v-show="!item.eyeFlag">
              </svg-icon>
              <svg-icon svg-name="eye-hidden" fill="white"
                v-show="item.eyeFlag">
              </svg-icon>
            </span>
          </div>
          <div class="tip">
            <span>该账户为</span>【{{ item.entName }}】<span>添加的指定收款账户</span>
          </div>
          <div class="mark">
            <img v-if="item.cardUpdStatus === 0"
              src="../../assets/img/user/icon-examine.png" alt="" />
            <img v-else src="../../assets/img/user/icon-normal.png" alt="" />
          </div>
        </Slide>
        <template #addons>
          <div class="carousel__pagination__box" center-a>
            我的工资卡
            <div class="carousel__pagination">
              <div class="number" v-for="(bank, index) in banks" :key="index"
                :class="{active: index === activeIndex}">{{index + 1}}<div
                  class="dot" v-if="bank.isNew"></div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <van-cell-group>
        <van-cell is-link @click="toEdit">
          <template #title>
            <div class="cell-title">
              <img class="edit" src="../../assets/img/user/icon-edit.png"
                alt="" />
              <span
                :class="['name', banks[activeIndex] && banks[activeIndex].cardUpdStatus === 0 ? 'disabled' : '']">申请修改</span>
              <img
                v-if="banks[activeIndex] && banks[activeIndex].cardUpdStatus === 0"
                class="icon" src="../../assets/img/user/icon-iscommit.png"
                alt="" />
            </div>
          </template>
        </van-cell>
        <van-cell is-link @click="toHistory">
          <template #title>
            <div class="cell-title">
              <img class="record" src="../../assets/img/user/icon-record.png"
                alt="" />
              <span class="name">修改记录</span>
              <img v-if="banks[activeIndex] && banks[activeIndex].isNew"
                class="icon" src="../../assets/img/user/icon-new.png" alt="" />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </template>
    <no-data v-if="!banks.length && requested"></no-data>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import decryptInfo from 'utils/decryptInfo'
import collect from 'utils/collect'
import storage from 'utils/storage'
import noData from 'components/noData'

export default {
  data() {
    return {
      activeIndex: 0,
      banks: [],
      requested: false
    }
  },
  computed: {},
  created() {
    this.getBankList()
  },
  methods: {
    async getBankList() {
      try {
        const res = await this.$Roll.empCard()
        this.banks = decryptInfo(res.data, 'cardNo').map((item) => {
          return Object.assign(item, { eyeFlag: true })
        })
      } finally {
        this.requested = true
      }
    },
    toHistory() {
      const ids = collect.getValueList(this.banks[this.activeIndex].bankCardGroups, 'id')
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
    Carousel,
    Slide,
    noData
  }
}
</script>
