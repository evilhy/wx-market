<template>
  <mt-popup v-model="flag"
            position="right"
            class="popup-page">
    <mt-header :title="title" class="protocol-title">
          <template slot="left">
            <p class="back-wrap" @click="flag = false">
              <span class="v-arrow"></span>
            </p>
          </template>
    </mt-header>
    <div class="content-wrap">
      <div class="content-title" v-if="title"><span class="line"></span><span class="title">{{title}}</span><span class="line"></span></div>
      <slot></slot>
    </div>
  </mt-popup>
</template>
<script>
export default {
  props: {
    title: String
  },
  data () {
    return {
      flag: false
    }
  },
  methods: {
    show () {
      this.flag = true
    }
  }
}
</script>