<template>
  <div class="v-loading" center-c-a :style="rootStyle">
    <component :is="typeCmp" :text="options.text"></component>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import { upperFirst } from 'utils/assist.js'
import LoadingRotate from './rotate.vue'
import LoadingSquare from './square.vue'
import LoadingBounce from './bounce.vue'
import LoadingLoader from './loader.vue'

export default defineComponent({
  name: 'Loading',
  components: {
    LoadingRotate,
    LoadingSquare,
    LoadingBounce,
    LoadingLoader
  },
  setup(props) {
    const options = reactive({
      type: 'rotate',
      loadingColor: '#4994df',
      bgColor: '#222',
      textColor: '#bbb',
      text: '加载中...'
    })

    let typeCmp = computed(() => {
      return `Loading${upperFirst(options.type)}`
    })
    let rootStyle = computed(() => {
      return `
        --loading-color: ${options.loadingColor};
        --loading-bg-color: ${options.bgColor};
        --loading-text-color: ${options.textColor};
      `
    })

    const setOptions = ({ type, loadingColor, bgColor, textColor, text } = {}) => {
      if (type) {
        options.type = type
      }
      if (loadingColor) {
        options.loadingColor = loadingColor
      }
      if (bgColor) {
        options.bgColor = bgColor
      }
      if (textColor) {
        options.textColor = textColor
      }
      if (text) {
        options.text = text
      }
    }
    return {
      typeCmp,
      rootStyle,
      options,
      setOptions
    }
  },
  methods: {}
})
</script>
<style lang="scss" scoped>
.v-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--loading-bg-color);
  z-index: 9999;
}
</style>
