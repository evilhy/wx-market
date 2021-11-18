<template>
  <svg :class="svgClass" aria-hidden="true" :style="`fill: ${fill}; stroke: ${stroke};stroke-width:${strokeWidth};`">
    <use :xlink:href="svgHref"></use>
  </svg>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  components: {},
  props: {
    svgName: {
      type: String,
      required: true
    },
    fill: {
      type: String,
      default: '#999'
    },
    stroke: {
      type: String,
      default: '#999'
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgHref() {
      return `#icon-${this.svgName}`
    },
    svgClass() {
      if (this.className) {
        return `svg-icon-${this.className}`
      }
      return 'svg-icon'
    }
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
