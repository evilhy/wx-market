<template>
  <div class="hr-ebank-page">
    <div class="list">
      <div class="outline" @click="toPage('mobileBank')">手机银行</div>
      <div class="item">
        <span class="text" @click="toPage('smsService')">短信服务平台</span>
      </div>
      <div class="item">
        <span class="text" @click="toPage('personalInternetBank')">个人网上银行</span>
      </div>
      <div class="item">
        <span class="text" @click="toPage('entInternetBank')">企业网上银行</span>
      </div>
      <div class="item">
        <span class="text" @click="toPage('mobileBank2')">手机银行</span>
      </div>
    </div>
  </div>
</template>

<script>
import menuDic from './menuDic'
export default {
  data () {
    return {}
  },
  created () { },
  methods: {
    toPage (url) {
      window.location.href = menuDic[url]
    }
  }
}
</script>