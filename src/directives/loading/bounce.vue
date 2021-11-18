<template>
  <div class="loading-bounce"></div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingBounce',
  components: {},
  setup(props) {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.loading-bounce {
  position: relative;
  width: 8.5vw;
  height: 8.5vw;
  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--loading-color);
    -webkit-animation: loading-bounce 2s infinite ease-in-out;
    animation: loading-bounce 2s infinite ease-in-out;
  }
  &::after {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
}
@-webkit-keyframes loading-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes loading-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
