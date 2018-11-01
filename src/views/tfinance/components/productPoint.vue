<template>
  <div class="product-point-wrap"
       @click="showPointDetail">
    <div class="item"
         v-for="(item, index) in pointList"
         :key="index">
      <img class="icon"
           src="../../../assets/img/tfinance/icon-save.png"
           alt="">
      <span>{{item}}</span>
    </div>
    <popup-page title="服务说明" ref="point-detail">
      <div class="detail-item" v-for="(item, index) in pointDetailList" :key="index">
        <div class="title-wrap">
          <img class="detail-icon" src="item.icon" alt="">
          <p class="title">{{item.title}}</p>
        </div>
        <div class="content">{{item.content}}</div>
      </div>
    </popup-page>
  </div>
</template>
<script>
import popupPage from './popup-page'
export default {
  data () {
    return {
      pointList: [
        '安全理财',
        '收益更高',
        '一对一服务'
      ],
      pointDetailList: [
        {
          icon: '',
          title: '银行出品更安全',
          content: '华夏银行龙盈理财，为放薪管家渠道专属打造。'
        },
        {
          icon: '',
          title: '收益全面领先',
          content: '华夏银行理财收益普遍高于市场同类型产品收益，同事团专属理财在此基础上进一步增加了额外加息，收益再提升。'
        },
        {
          icon: '',
          title: '专属一对一理财服务',
          content: '从预约到购买有任何疑问，我们将安排专属客户经理为您进行一对一的专属服务。'
        }
      ]
    }
  },
  methods: {
    showPointDetail () {
      this.$refs['point-detail'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>