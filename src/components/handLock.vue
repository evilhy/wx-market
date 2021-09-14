<template>
  <div id="hand-lock-container" class="hand-lock-container"></div>
</template>

<script>
import Recorder from 'utils/locker/recorder'

export default {
  data() {
    return {
      recorder: null,
      posInfo: {
        11: 'N1',
        21: 'N2',
        31: 'N3',
        12: 'N4',
        22: 'N5',
        32: 'N6',
        13: 'N7',
        23: 'N8',
        33: 'N9'
      }
    }
  },
  mounted() {
    this.recorder = new Recorder(document.getElementById('hand-lock-container'))
    this.recorder.afterDrawNotEnough = this.afterDrawNotEnough
    this.recorder.afterDrawFinished = this.afterDrawFinished
  },
  methods: {
    afterDrawNotEnough(res) {
      this.$emit('not-enough', this.transPos(res))
    },
    afterDrawFinished(res) {
      this.$emit('finished', this.transPos(res))
    },
    transPos(data) {
      return data.map((item) => this.posInfo[item.pos.join('')])
    }
  }
}
</script>
<style lang="scss">
// 根据设计稿变动
.hand-lock-container {
  position: relative;
  margin: 0 auto;
  width: 90%;
  height: 0;
  padding-bottom: 90%;
}
</style>
