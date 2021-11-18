<template>
  <div class="loading-square">
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
    <div class="loading-dot"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingSquare',
  components: {},
  setup(props) {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.loading-square {
  width: 13vw;
  height: 13vw;
  animation: loading-dot-circle 5.6s linear infinite;
  .loading-dot {
    position: absolute;
    margin: auto;
    width: 3.5vw;
    height: 3.5vw;
    border-radius: 50%;
    background: var(--loading-color);
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  .loading-dot:first-child {
    top: 0;
    bottom: 0;
    left: 0;
    animation-name: loading-dot-a;
  }
  .loading-dot:nth-child(2) {
    left: 0;
    right: 0;
    top: 0;
    opacity: 0.8;
    animation-name: loading-dot-b;
  }
  .loading-dot:nth-child(3) {
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0.6;
    animation-name: loading-dot-c;
  }
  .loading-dot:nth-child(4) {
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    animation-name: loading-dot-d;
  }
}
@keyframes loading-dot-circle {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  30% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  55% {
    transform: rotate(270deg);
  }
  75% {
    transform: rotate(270deg);
  }
  80% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-dot-a {
  25% {
    left: 0;
  }
  45%,
  50% {
    left: 4.5vw;
    width: 4vw;
    height: 4vw;
  }
  90% {
    left: 0;
    height: 3.5vw;
    width: 3.5vw;
  }
}
@keyframes loading-dot-b {
  25% {
    top: 0;
  }
  45%,
  50% {
    top: 4.5vw;
    width: 4vw;
    height: 4vw;
  }
  90% {
    top: 0;
    height: 3.5vw;
    width: 3.5vw;
  }
}
@keyframes loading-dot-c {
  25% {
    right: 0;
  }
  45%,
  50% {
    right: 4.5vw;
    width: 4vw;
    height: 4vw;
  }
  90% {
    right: 0;
    height: 3.5vw;
    width: 3.5vw;
  }
}
@keyframes loading-dot-d {
  25% {
    bottom: 0;
  }
  45%,
  50% {
    bottom: 4.5vw;
    width: 4vw;
    height: 4vw;
  }
  90% {
    bottom: 0;
    height: 3.5vw;
    width: 3.5vw;
  }
}
</style>
