<template>
  <label :for="name" class="v-checkbox-wrap" @click.stop="toggle">
    <input type="checkbox" :id="name" class="input" :checked="currentValue === trueValue" />
    <span class="v-checkbox"></span>
  </label>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: 0
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: 1
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: 0
    }
  },
  data() {
    return {
      currentValue: this.modelValue
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.currentValue = val
      }
    },
    currentValue: {
      deep: true,
      handler(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  created() {},
  methods: {
    toggle(e) {
      if (e.target.nodeName === 'INPUT' || e.srcElement.nodeName === 'INPUT') {
        this.currentValue = this.currentValue === this.trueValue ? this.falseValue : this.trueValue
      }
    }
  }
}
</script>
