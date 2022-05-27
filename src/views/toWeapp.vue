<template>
  <div class="link-wrap">
    <div class="item">
      <span class="img-wrap">
        <wx-open-launch-weapp id="launch-btn" class="img-wrap opentag" username="gh_8e854ec807ff" path="pages/update/update.html">
          <div v-is="'script'" type="text/wxtag-template">
            <div v-is="'style'">.block{ position: absolute; left: 100%; height: 100%; left: 0; top: 0; }</div>
            <div class="block"></div>
          </div> </wx-open-launch-weapp
        ><img class="hot" src="../assets/img/icon-hot.png" alt="" /><img src="../assets/img/icon-home-energy.png" alt=""
      /></span>
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
  padding: 0 1.5625vw;
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
      margin-bottom: 3px;
      .opentag {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 3px;
      }
      .hot {
        width: 30px;
        height: 30px;
        position: absolute;
        right: -15px;
        top: -9.4px;
        border-radius: 0;
      }
      .notice-count {
        top: 0;
        left: 44px;
      }
    }
  }
}
</style>
