<template>
  <div class="loading-loader"></div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingLoader',
  components: {},
  setup(props) {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.loading-loader,
.loading-loader:before,
.loading-loader:after {
  background: var(--loading-color);
  color: var(--loading-color);
  -webkit-animation: loading-loader 1s infinite ease-in-out;
  animation: loading-loader 1s infinite ease-in-out;
  width: 2.5vw;
  height: 4.5vw;
}
.loading-loader:before,
.loading-loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loading-loader {
  position: relative;
  font-size: 2.5vw;
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loading-loader:before {
  left: -4vw;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loading-loader:after {
  left: 4vw;
}

@keyframes loading-loader {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4vw;
  }
  40% {
    box-shadow: 0 -4vw;
    height: 6vw;
  }
}
</style>
