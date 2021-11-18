<template>
  <div center-c-v class="no-result">
    <img :src="require(`./img/no-${options.type}.png`)" alt="" />
    <p class="text">{{ options.text }}</p>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'NoResult',
  components: {},
  setup(props) {
    const options = reactive({
      type: 'data',
      text: '暂无数据'
    })
    const setOptions = ({ type, text } = {}) => {
      if (type) {
        options.type = type
      }
      if (text) {
        options.text = text
      }
    }
    return {
      options,
      setOptions
    }
  }
})
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
  .text {
    font-size: 14px;
    color: #999;
  }
}
</style>
