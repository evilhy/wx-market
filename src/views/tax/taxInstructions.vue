<template>
  <div class="instructions-page">
    <img v-for="(img,index) in imageList" :key="index" v-lazy="img" >
  </div>
</template>

<script>
export default {
  name: 'child-explain',
  data () {
    return {
      imageList: [
        require('../../assets/img/tax/instructions-1.png'),
        require('../../assets/img/tax/instructions-2.png'),
        require('../../assets/img/tax/instructions-3.png'),
        require('../../assets/img/tax/instructions-4.png'),
        require('../../assets/img/tax/instructions-5.png')
      ]
    }
  },
  created () { },
  methods: {}
}
</script>
