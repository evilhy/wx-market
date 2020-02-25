<template>
  <div class="home-manager-dialog">
    <van-overlay :show="show" @click="show = false">
      <div class="wrap" @click.stop>
        <div class="main" >
          <div class="name">尊敬的陈先生/女士</div>
          <div class="desc">您好！感谢您使用华夏卡薪资代发，为了进一步提升代发资金收益，我们真诚地邀请您开通或体验一下服务：</div>
          <div class="single bg1">
            <span class="single-l">普通基金会</span>
            <span class="single-c">.</span>
            <span class="single-r">活期类货币基金理财产品</span>
          </div>
          <div class="single bg2">
            <span class="single-l">普通基金会</span>
            <span class="single-c">.</span>
            <span class="single-r">活期类货币基金理财产品</span>
          </div>
          <div class="single bg3">
            <span class="single-l">普通基金会</span>
            <span class="single-c">.</span>
            <span class="single-r">活期类货币基金理财产品</span>
          </div>
          <div class="manager-box">
            <div class="name">李子微 <span class="line">───</span><span>您的专属客户经理</span></div>
            <div class="branch">武汉分行</div>
            <div class="info">
              吸存码<span>598598</span>
              手机号<span>13971772020</span>
            </div>
            <div class="phone-box">
              <van-icon name="phone" /><br>
              <span>拨号</span>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script type="text/ecmascript-6">
// import storage from 'utils/storage'
// import helper from 'utils/helper'
export default {
  data () {
    return {
      show: true
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
  }
}
</script>
