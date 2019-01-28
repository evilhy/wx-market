<template>
  <div class="code-input-wrap">
    <input ref="code-input" class="input code-input" :class="{ 'hidden': !flag }" type="tel" :maxlength="len" v-model.trim="code" @focus="flag=false" @blur="flag=true" />
    <div class="code-wrap" :class="{'focus': !flag}">
      <span v-for="(codeChar, index) in codeList" :key="index" class="code-item">
        <template v-if="codeChar">
          <span v-show="visible">{{codeChar}}</span>
          <span v-show="!visible" class="dot"></span>
        </template>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    len: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      flag: true,
      code: ''
    }
  },
  computed: {
    codeList () {
      let codeArr = this.code.split('')
      while (codeArr.length < this.len) {
        codeArr.push('')
      }
      return codeArr
    }
  },
  watch: {
    code (val) {
      if (val.length === this.len) {
        this.$emit('complete', val)
      }
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    clearCode () {
      this.code = ''
    }
  }
}
</script>