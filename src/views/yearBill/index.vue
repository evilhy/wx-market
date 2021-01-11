<template>
  <div class="year-bill-page">
    <van-swipe ref="swipe" v-show="showSwipe" class="my-swipe" vertical :show-indicators="false" :loop="false">
      <van-swipe-item>
        <div class="p1 wrap">
          <img src="../../assets/img/yearBill/p1.png" alt="">
          <!--<img v-lazy="imgPage.p1" alt="">-->
          <!--<van-image lazy-load :src="imgPage.p1" />-->
          <div class="p1-d1 font1">{{yearBill.bindDateTime | date('Y年m月d日')}}</div>
          <div class="p1-d2 font1">{{yearBill.differDays}}天</div>
          <div class="p1-d3 font1">{{yearBill.pushTimes}}次</div>
          <div class="p1-d4 font2">确认过眼神，你是对的人！</div>
          <div class="next">
            <img src="../../assets/img/yearBill/next.png" alt="">向上滑动翻页
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="p2 wrap">
          <img src="../../assets/img/yearBill/p2.png" alt="">
          <!--<img v-lazy="imgPage.p2" alt="">-->
          <!--<van-image lazy-load :src="imgPage.p2" />-->
          <div class="p2-d1 font1">{{yearBill.totalAmount}}元</div>
          <div class="p2-d2 font1">{{yearBill.deductTotalAmt}}元</div>
          <div class="p2-d3 font1">{{yearBill.monthCount}}</div>
          <div class="p2-d4 font3">{{monthCountDesc}}</div>
          <div class="p2-d5 font2">陌生到熟悉，我是你坚强的后盾。</div>
          <div class="next">
            <img src="../../assets/img/yearBill/next.png" alt="">向上滑动翻页
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="p3 wrap">
          <img src="../../assets/img/yearBill/p3.png" alt="">
          <!--<img v-lazy="imgPage.p3" alt="">-->
          <!--<van-image lazy-load :src="imgPage.p3" />-->
          <div class="p3-d1">
            <div class="cell" v-for="(item, index) in yearBill.fundWages" :key="index">
              <div class="info">
                <div class="source">{{item.fundType}}</div>
                <div class="data-box">
                  <div class="money">{{item.fundAmount}}元</div>
                  <div class="percent">{{item.fundPercent}}%</div>
                </div>
              </div>
              <van-progress :percentage="item.fundPercent" track-color="rgba(205,143,70,0.20)" color="linear-gradient(90deg, #FF7C4C 0%, #EC3616 100%)" stroke-width="10" :show-pivot="false"/>
            </div>
          </div>
          <div class="p3-d2 font2">虽与我无缘，但愿君有钱！</div>
          <div class="next">
            <img src="../../assets/img/yearBill/next.png" alt="">向上滑动翻页
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="p4 wrap">
          <img src="../../assets/img/yearBill/p4.png" alt="">
          <!--<img v-lazy="imgPage.p4" alt="">-->
          <!--<van-image lazy-load :src="imgPage.p4" />-->
          <div class="p4-d1 font1">{{yearBill.maxSingleAmountDate | date('Y年m月d日')}}</div>
          <div class="p4-d2 font1">{{yearBill.maxSingleAmount}}元</div>
          <div class="p4-d3 font1">{{yearBill.maxMonth}}月</div>
          <div class="p4-d4 font1">{{yearBill.minMonth}}月</div>
          <div class="p4-d5 font1">{{yearBill.differAmount}}元</div>
          <div class="p4-d6 font2">苟富贵，勿相忘，记得常回来看看！</div>
          <div class="next">
            <img src="../../assets/img/yearBill/next.png" alt="">向上滑动翻页
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="p5 wrap">
          <img src="../../assets/img/yearBill/p5.png" alt="">
          <!--<img v-lazy="imgPage.p5" alt="">-->
          <!-- <van-image lazy-load :src="imgPage.p5" />-->
          <div class="p5-d1 font1">{{yearBill.industry}}</div>
          <div class="p5-d2 font1">{{yearBill.industryAvgAmount}}万元/年</div>
          <div class="p5-d3 font1">{{yearBill.firstTierCitiesAvgAmount}}万元/年</div>
          <div class="p5-d4 font1">{{yearBill.secondTierCitiesAvgAmount}}万元/年</div>
          <div class="next">
            <img src="../../assets/img/yearBill/next.png" alt="">向上滑动翻页
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="p6 wrap">
          <img src="../../assets/img/yearBill/p6.png" alt="">
          <!--<img v-lazy="imgPage.p6" alt="">-->
          <!--<van-image lazy-load :src="imgPage.p6" />-->
          <div class="p6-d1 font1">{{yearBill.percent}}%</div>
          <div class="p6-d2">
            <img :src="percent.img" alt="">
          </div>
          <div class="p6-d3 font3">{{percent.desc}}</div>
          <div class="p6-d4">
            <div class="desc">产品推荐</div>
            <div class="recommend-box"></div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="first-page" v-show="!showSwipe">
      <img src="../../assets/img/yearBill/main.png" alt="">
     <!-- <van-image lazy-load :src="imgPage.main" />-->
      <div class="open-box">
        <template v-if="currentRate === 100">
          <img class="circle1" src="../../assets/img/yearBill/circle1.png" alt="">
          <img class="circle2" src="../../assets/img/yearBill/circle2.png" alt="">
          <img class="circle3" src="../../assets/img/yearBill/circle3.png" alt="">
          <img @click="aa" class="open-btn" src="../../assets/img/yearBill/open-btn.png" alt="">
        </template>
        <van-circle v-else v-model="currentRate" :rate="98" :speed="speed" layer-color="rgb(255,242,210,0.2)" color="#FFF2D2" stroke-width="16">
          <div class="text-wrap">
            <div class="progress">{{currentRate.toFixed(0)}}%</div>
            <div class="start-desc">开启中</div>
          </div>
        </van-circle>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgPage: {
        main: require(`../../assets/img/yearBill/main.png`),
        p1: require(`../../assets/img/yearBill/p1.png`),
        p2: require(`../../assets/img/yearBill/p2.png`),
        p3: require(`../../assets/img/yearBill/p3.png`),
        p4: require(`../../assets/img/yearBill/p4.png`),
        p5: require(`../../assets/img/yearBill/p5.png`),
        p6: require(`../../assets/img/yearBill/p6.png`)
      },
      currentRate: 0,
      speed: 20,
      showSwipe: false,
      yearBill: {}
    }
  },
  computed: {
    monthCountDesc() {
      let {monthCount} = this.yearBill
      if (monthCount <= 3) {
        return '以后五块钱以上的活动不叫你！'
      } else if (monthCount > 3 && monthCount <= 7) {
        return '啥时候能实现车厘子自由！'
      } else if (monthCount > 7 && monthCount <= 10) {
        return '兄die，你是真的稳！'
      } else {
        return '你大爷永远是你大爷！'
      }
    },
    percent() {
      let {percent} = this.yearBill
      if (percent < 10) {
        return {desc: '只要我跑的过快，贫穷就追不上我！', img: require(`../../assets/img/yearBill/theme1.png`)}
      } else if (percent >= 10 && percent < 40) {
        return {desc: '2021年也要努力营业好每一天！', img: require(`../../assets/img/yearBill/theme2.png`)}
      } else if (percent >= 40 && percent < 70) {
        return {desc: '原来你才是这条gai最靓的崽！', img: require(`../../assets/img/yearBill/theme3.png`)}
      } else if (percent >= 70 && percent < 90) {
        return {desc: 'OMG，2021年继续干就完事了，盘它！', img: require(`../../assets/img/yearBill/theme4.png`)}
      } else {
        return {desc: '你才是狠人，财富这块拿捏得死死的！', img: require(`../../assets/img/yearBill/theme5.png`)}
      }
    }
  },
  created () {
   this.getYearBill()
  },
  methods: {
    aa() {
      this.showSwipe = true
       this.$nextTick(()=> {
        this.$refs.swipe.resize()
      })
    },
    async getYearBill() {
      try {
        let res = await this.$Bill.bill()
        /* this.yearBill = res.data */
      } finally {
        this.currentRate = 100

         this.yearBill = {
          "differDays": 367,
          "pushTimes": 7,
          "monthCount": 2,
          "totalAmount": "69009.60",
          "maxAmount": "9076.36",
          "maxMonth": "10",
          "minAmount": "1500",
          "minMonth": "3",
          "maxSingleAmountDate": "20201015",
          "bindDateTime": "20180902",
          "maxSingleAmount": "19076.36",
          "differAmount": "10000.00",
          "deductTotalAmt": "9000.00",
          "industry": "电信、广播电视和卫星传输服务",
          "fundWages": [
            {
              "fundType": "工资",
              "fundAmount": "50230.1",
              "fundPercent": "82.5"
            } ,
            {
              "fundType": "报销",
              "fundAmount": "0",
              "fundPercent": "0"
            } ,
            {
              "fundType": "补贴",
              "fundAmount": "10000",
              "fundPercent": "16.5"
            } ,
            {
              "fundType": "其他",
              "fundAmount": "93",
              "fundPercent": "1"
            }
          ],
          "industryAvgAmount": "10.3",
          "firstTierCitiesAvgAmount": "9.9",
          "secondTierCitiesAvgAmount": "6.8",
          "percent": "30"
        }
      }

    }
  }
}
</script>
