<template>
  <div class="manager-info-wrap" v-if="name && phone">
    <div class="info-box">
      <avator size="normal"></avator>
      <div class="name-phone">
        <span class="name">{{ name }}</span>
        <span class="phone">{{ phone }}</span>
      </div>
      <a class="call" :href="`tel: ${phone}`">一键拨号</a>
    </div>
    <div class="tip">
      <p>尊敬的客户：您好！</p>
      <p>我是您的专属客户经理，预约成功后，将由我为您提供一对一的专属服务，有任何疑问可点击上方电话按钮联系我。</p>
    </div>
  </div>
</template>
<script>
import avator from './avator'

export default {
  props: {
    name: String,
    phone: String,
    avator: String
  },
  data() {
    return {}
  },
  components: {
    avator
  }
}
</script>
