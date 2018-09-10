<template>
  <div class="msg-list-wrap">
    <!-- 有留言 -->
    <template v-if="list.length || allCount">
      <div class="pull-down-more" v-show="pullStatus === 'down'">加载中...</div>
      <div class="list-wrapper" ref="scroll" :class="{'pull-up': pullStatus === 'up','pull-down': pullStatus === 'down'}">
        <ul class="list">
          <li class="item" :class="[msg.chat_msg_type === '1' ? 'self': 'manager', 'item-' + msg.chat_msg_id]" v-for="(msg,index) in list" :key="index">
            <div class="pic"></div>
            <div class="msg">{{msg.msg_content}}
              <span class="triangle"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="pull-up-more" v-show="pullStatus === 'up'">刷新中...</div>
    </template>
    <template v-else>
      <div class="no-msg">
        有任何疑问可在此留言，我会尽快为您提供服务
      </div>
    </template>
  </div>
</template>

<script>

import BScroll from 'better-scroll'
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    allCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      scroll: null,
      scrollListener: true,
      pullStatus: '',
      scrollEleClass: ''
    }
  },
  computed: {},
  watch: {
  },
  created () { },
  mounted () { },
  methods: {
    initScroll () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          scrollbar: true,
          pullUpLoad: {
            threshold: 5
          }
        })
        this.scroll.scrollToElement('.item-' + this.list[this.list.length - 1].chat_msg_id)
        this.scroll.on('scroll', (pos) => {
          if (!this.scrollListener || this.allCount === this.list.length) return
          if (pos.y >= 0) {
            this.scrollListener = false
            this.pullStatus = 'down'
            this.scrollEleClass = this.list[0].chat_msg_id
            this.$emit('pull-down')
          }
        })
        this.scroll.on('pullingUp', (pos) => {
          if (!this.scrollListener) return
          this.scrollListener = false
          this.pullStatus = 'up'
          this.$emit('pull-up')
        })
      })
    },
    freshScroll () {
      this.$nextTick(() => {
        if (this.pullStatus === 'down') {
          this.scroll.scrollToElement('.item-' + this.scrollEleClass)
        } else {
          this.scroll.finishPullUp()
        }
        this.scroll.refresh()
        this.pullStatus = ''
        this.scrollListener = true
      })
    }
  },
  components: {}
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>

</style>
