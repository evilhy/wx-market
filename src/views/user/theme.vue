<template>
  <div class="page theme-page white">
    <div class="title">选择主题</div>
    <van-radio-group class="list" v-model="radio">
      <div class="item">
        <van-radio name="1"></van-radio>
        <div class="tag">默认</div>
      </div>
      <div class="item">
        <van-radio name="2"></van-radio>
      </div>
      <div class="item">更多个性化主题<br />敬请期待</div>
    </van-radio-group>
    <van-button class="fixed-bottom-btn primary-btn">保存设置</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '1'
    }
  },
  created () { },
  methods: {}
}
</script>