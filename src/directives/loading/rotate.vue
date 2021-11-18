<template>
  <div class="loading-rotate">
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
    <span class="loading-line"></span>
  </div>
  <p class="loading-text">{{ text }}</p>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingRotate',
  components: {},
  props: {
    text: {
      type: String,
      default: '加载中...'
    }
  },
  setup(props) {
    return {}
  }
})
</script>
<style lang="scss">
.loading-rotate {
  position: relative;
  width: 8vw;
  height: 8vw;
  animation: loading-rotate 0.8s steps(12) infinite;
}
.loading-line {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
.loading-line:first-child {
  opacity: 1;
  transform: rotate(30deg);
}
.loading-line:nth-child(2) {
  opacity: 0.93;
  transform: rotate(60deg);
}
.loading-line:nth-child(3) {
  opacity: 0.87;
  transform: rotate(90deg);
}
.loading-line:nth-child(4) {
  opacity: 0.81;
  transform: rotate(120deg);
}
.loading-line:nth-child(5) {
  opacity: 0.75;
  transform: rotate(150deg);
}
.loading-line:nth-child(6) {
  opacity: 0.68;
  transform: rotate(180deg);
}
.loading-line:nth-child(7) {
  opacity: 0.62;
  transform: rotate(210deg);
}
.loading-line:nth-child(8) {
  opacity: 0.56;
  transform: rotate(240deg);
}
.loading-line:nth-child(9) {
  opacity: 0.5;
  transform: rotate(270deg);
}
.loading-line:nth-child(10) {
  opacity: 0.43;
  transform: rotate(300deg);
}
.loading-line:nth-child(11) {
  opacity: 0.37;
  transform: rotate(330deg);
}
.loading-line:nth-child(12) {
  opacity: 0.31;
  transform: rotate(360deg);
}
.loading-line::before {
  width: 8%;
  height: 28%;
  content: '';
  display: block;
  margin: 0 auto;
  border-radius: 40%;
  background: var(--loading-text-color);
}
.loading-text {
  color: var(--loading-text-color);
  margin-top: 5px;
}
@keyframes loading-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
