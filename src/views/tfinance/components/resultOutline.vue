<template>
  <div class="result-outline-wrap">
    <div class="top">
      <!-- 预约期 -->
      <template v-if="term === 1">
        <div class="time"><count-down :now="currentNowDate" :target="productInfo.intentEndDate" :format="['天', ':', ':', '']" @end="end(2, productInfo.intentEndDate)"></count-down>后结束预约</div>
      </template>
      <!-- 过渡期 -->
      <template v-if="term === 2">
        <div class="time">
          <count-down :now="currentNowDate" :target="productInfo.subscribeStartDate" :format="['天', ':', ':', '']" @end="end(3, productInfo.subscribeStartDate)"></count-down>后开启认购
        </div>
      </template>
      <!-- 认购期 -->
      <template v-if="term === 3">
        <div class="time">
          <count-down :now="currentNowDate" :target="productInfo.subscribeEndDate" :format="['天', ':', ':', '']" @end="end(4, productInfo.subscribeEndDate)"></count-down>后结束认购
        </div>
      </template>
      <!-- 认购结束 -->
      <template v-if="term === 4">
        <div class="time" v-if="result.status === 2">
          <span class="deal-day">{{ result.dealDay }}天</span>后到期兑付
        </div>
        <div class="time stress" v-if="result.status === 1">很遗憾，您未认购</div>
      </template>
      <!-- 兑付结束 -->
      <template v-if="term === 5">
        <div class="time green" v-if="result.status === 2">已兑付</div>
        <div class="time stress" v-if="result.status === 1">很遗憾，您未认购</div>
      </template>
      <div class="more" @click="seeMore"><span>查看更多</span><span class="v-arrow"></span></div>
    </div>
    <template v-if="markList.length">
      <div class="avator-box" :class="{ 'more-avator-box': productInfo.intentNum > 3 }" v-if="result.list" @click="seeMore">
        <avator :class="`avator-${index}`" size="large" v-for="(avator, index) in result.list" :key="index" :src="avator.headimgurl"></avator>
        <avator class="avator-3" size="large" :src="moreAvator" v-if="productInfo.intentNum > 3"></avator>
      </div>
      <!-- 预约期 -->
      <template v-if="term === 1">
        <!-- 达到最高档 -->
        <div class="tip" v-if="currentIndex === markList.length - 1">
          恭喜，已有<span class="stress">{{ productInfo.intentNum }}</span
          >位同事完成预约！<br />收益已达最高档位<span class="stress">{{ markList[currentIndex].levelRate }}%</span>
        </div>
        <!-- 未达到最高档 -->
        <div class="tip" v-else>
          <!-- 达成当前档位 -->
          <template v-if="markList[currentIndex].sucess === 1">
            当前收益<span class="stress">{{ markList[currentIndex].levelRate }}%</span>，再邀请<span class="stress">{{ markList[currentIndex + 1].minPeople - productInfo.intentNum }}</span
            >位同事可额外加息<span class="stress">{{ (markList[currentIndex + 1].levelRate * 1000 - markList[currentIndex].levelRate * 1000) / 1000 }}%</span>
          </template>
          <template v-else>
            额外邀请<span class="stress">{{ markList[currentIndex].minPeople - productInfo.intentNum }}</span
            >位同事可获得收益<span class="stress">{{ markList[currentIndex].levelRate }}%</span>
          </template>
        </div>
      </template>
      <!-- 预约期结束后 -->
      <template v-else>
        <!-- 达到最高档 -->
        <div class="tip" v-if="currentIndex === markList.length - 1">
          恭喜，已有<span class="stress">{{ productInfo.intentNum }}</span
          >位同事完成预约！<br />收益已达最高档位<span class="stress">{{ markList[currentIndex].levelRate }}%</span>
        </div>
        <div class="tip" v-else>
          <!-- 达成当前档位 -->
          <template v-if="markList[currentIndex].sucess === 1">
            您的理财收益为<span class="stress">{{ markList[currentIndex].levelRate }}%</span>
            <span v-if="currentIndex === 0">未能获得额外加息</span>
            <span v-if="currentIndex !== 0"
              >获得<span class="stress">{{ (markList[currentIndex].levelRate * 1000 - markList[currentIndex - 1].levelRate * 1000) / 1000 }}%</span>的加息</span
            >
          </template>
          <template v-else> 您未达到最低档所需人数，无理财收益 </template>
        </div>
        <!-- 未达到最高档 -->
      </template>
    </template>
  </div>
</template>
<script>
import collect from 'utils/collect'
import avator from './avator'
import countDown from '../../../components/countDown'

export default {
  props: {
    term: {
      type: Number, // 1.预约期 2.过渡期 3.认购期 4.认购结束 5.兑付结束
      default: 1
    },
    result: {
      type: Object,
      default() {
        return {
          status: 1, // 1.预约成功 2.认购成功
          dealDay: 0,
          list: []
        }
      }
    },
    productInfo: {
      type: Object,
      default() {
        return {
          nowDate: 0,
          intentStartDate: 0,
          intentEndDate: 0,
          subscribeStartDate: 0,
          subscribeEndDate: 0,
          markList: [],
          intentNum: 0,
          nowMark: 0,
          sucess: 0
        }
      }
    }
  },
  data() {
    return {
      moreAvator: require('../../../assets/img/tfinance/avator-more.png'),
      currentIndex: 0,
      markList: [],
      currentNowDate: 0
    }
  },
  watch: {
    productInfo(val) {
      this.calData()
    }
  },
  methods: {
    end(term, now) {
      this.currentNowDate = now
      this.$emit('end', term)
    },
    calData() {
      let { markList, nowMark, nowDate } = this.productInfo
      this.currentIndex = collect.indexOf(markList, 'markLevel', nowMark)
      this.markList = markList
      this.currentNowDate = nowDate
    },
    seeMore() {
      this.$emit('more')
    }
  },
  components: {
    avator,
    countDown
  }
}
</script>
