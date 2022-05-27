<template>
  <div class="link-wrap">
    <div class="item">
      <wx-open-launch-weapp id="launch-btn" class="img-wrap opentag" username="gh_8e854ec807ff" path="pages/update/update.html" @ready="toMiniappReady" @launch="handleLaunchFn" @error="handleErrorFn">
        <div v-is="'script'" type="text/wxtag-template">
          <div v-is="'style'">
            img { width: 100%; height: 100%; display: block; border-radius: 3.125vw; } .hot { width: 8.125vw; height: 5vw; position: absolute; right: -4.06vw; top: -2.5vw; border-radius: 0; }
            .notice-count { top: 0; left: 11.875vw; }
          </div>
          <img src="https://sitwxp.cardpu.com/icon-home-energy.png" alt="" />
        </div>
      </wx-open-launch-weapp>
      <img class="hot" src="https://sitwxp.cardpu.com/icon-hot.png" alt="" />
      <span class="label">小龙人寻宝记</span>
    </div>
    <div class="item">
      <span class="img-wrap"><img class="hot" src="../assets/img/icon-hot.png" alt="" /><img src="../assets/img/icon-home-energy.png" alt="" /></span>
      <span class="label">小龙人寻宝记</span>
    </div>
    <div class="item">
      <span class="img-wrap"><img class="hot" src="../assets/img/icon-hot.png" alt="" /><img src="../assets/img/icon-home-energy.png" alt="" /></span>
      <span class="label">小龙人寻宝记</span>
    </div>
    <div class="item">
      <span class="img-wrap"><img class="hot" src="../assets/img/icon-hot.png" alt="" /><img src="../assets/img/icon-home-energy.png" alt="" /></span>
      <span class="label">小龙人寻宝记</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import wxOpentag from 'mixins/wx-opentag'

export default defineComponent({
  name: '',
  components: {},
  mixins: [wxOpentag],
  setup(props) {
    const data = reactive({
      imgHot: require('../assets/img/icon-hot.png'),
      imgEnergy: require('../assets/img/icon-home-energy.png')
    })
    const refs = reactive({})
    // ready
    function toMiniappReady() {}
    // launch
    function handleLaunchFn() {}
    // error
    function handleErrorFn() {}
    return {
      ...toRefs(data),
      ...toRefs(refs),
      toMiniappReady,
      handleLaunchFn,
      handleErrorFn
    }
  }
})
</script>

<style lang="scss" scoped>
.link-wrap {
  height: 35.625vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    .img-wrap {
      position: relative;
      width: 12.5vw;
      height: 12.5vw;
      margin-bottom: 3.125vw;
    }
    .hot {
      right: 0;
    }
  }
}
</style>
