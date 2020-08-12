<template>
  <div id="hand-lock-container" class="hand-lock-container"></div>
</template>

<script>
import Recorder from 'utils/locker/recorder'
export default {
  data () {
    return {
      recorder: null
    }
  },
  mounted () {
    this.recorder = new Recorder(document.getElementById('hand-lock-container'))
    this.recorder.afterDrawNotEnough = this.afterDrawNotEnough
    this.recorder.afterDrawFinished = this.afterDrawFinished
  },
  methods: {
    afterDrawNotEnough (res) {
      this.$emit('notEnough', res)
    },
    afterDrawFinished (res) {
      this.$emit('finished', res)
    }
  }
}
</script>
<style lang="scss">
  .hand-lock-container{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
</style>