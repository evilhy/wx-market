<template>
  <div class="link-wrap">
    <div class="item">
      <wx-open-launch-weapp id="launch-btn" class="img-wrap opentag" username="gh_8e854ec807ff" path="pages/update/update.html" @ready="toMiniappReady" @launch="handleLaunchFn" @error="handleErrorFn">
        <div v-is="'script'" type="text/wxtag-template">
          <div v-is="'style'">.openbtn{background-color:#38f;color:#fff;width:100px;height:40px;line-height:40px;}</div>
          <div class="openbtn">跳转小程序</div>
        </div>
      </wx-open-launch-weapp>
      <span class="label">小龙人寻宝记</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import wxToMiniProgram from 'mixins/wxToMiniProgram'

export default defineComponent({
  name: '',
  components: {},
  mixins: [wxToMiniProgram],
  setup(props) {
    const data = reactive({})
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
  height: 228px;
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
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 20px;
      }
      .hot {
        width: 52px;
        height: 32px;
        position: absolute;
        right: -26px;
        top: -16px;
        border-radius: 0;
      }
      .notice-count {
        top: 0;
        left: 76px;
      }
    }
  }
}
</style>
