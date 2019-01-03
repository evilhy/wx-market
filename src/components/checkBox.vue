<template>
  <label :for="name" class="v-checkbox-wrap" @click.stop="toggle">
    <input type="checkbox" :id="name" class="input" :checked="checked">
    <span class="v-checkbox"></span>
  </label>
</template>
<script>
import UUID from 'utils/uuid'
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: `name-${UUID.createUUID()}`
    }
  },
  created () {
  },
  methods: {
    toggle () {
      this.$emit('tap')
    }
  }
}
</script>