<template>
  <div class="page theme-page white">
    <div class="title">选择主题</div>
    <van-radio-group class="list" v-model="currentTheme">
      <div class="item" v-for="(item, index) in themeList" :key="index" @click="currentTheme = item.name">
        <img :src="require(`../../assets/img/theme/${item.name}.png`)" alt="" />
        <van-radio :name="item.name"></van-radio>
        <div class="tag">{{ item.label }}</div>
      </div>
      <div class="item">更多个性化主题<br />敬请期待</div>
    </van-radio-group>
    <van-button class="fixed-bottom-btn theme-btn" @click="save">保存设置</van-button>
  </div>
</template>

<script>
import helper from 'utils/helper'

export default {
  data() {
    return {
      currentTheme: helper.getTheme(),
      themeList: [
        {
          name: 'heiyao',
          label: '黑曜'
        },
        {
          name: 'brightred',
          label: '嫣红'
        },
        {
          name: 'fourth',
          label: '国庆'
        },
        {
          name: 'newyear',
          label: '春节'
        }
      ]
    }
  },
  created() {},
  methods: {
    async save() {
      const theme = this.currentTheme
      await this.$Inside.theme(theme)
      helper.setTheme(theme)
      helper.toast('保存成功')
      this.$router.replace('home')
    }
  }
}
</script>
