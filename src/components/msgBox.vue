<template>
  <div class="msg-box">
    <div class="msg-list-wrap" ref="wrapper">
      <!-- 有留言 -->
      <van-list @load="getMsgList" v-model="loading" :finished="finished" :auto-fill="false"  ref="loadmore" v-if="msgList.length || allCount">
        <ul class="list">
          <li class="loading" v-if="msgList.length && allCount >= 20 && msgList.length !== allCount">加载中...</li>
          <li v-for="(msg,index) in msgList" :key="index" class="item-wrap" :class="'item-' + msg.chat_msg_id">
            <span class="time">{{msg.msg_date_time | msgTime}}</span>
            <div class="item" :class="[msg.chat_msg_type === '1' ? 'self': 'manager', 'item-' + msg.chat_msg_id]">
              <div class="pic manager" v-if="msg.chat_msg_type === '2'">
                <img :src="managerInfo.avatar_url" alt="" v-if="managerInfo.avatar_url" class="img">
                <img src="../assets/img/manager-default-avatar.png" alt="" class="img" v-if="!managerInfo.avatar_url">
              </div>
              <div class="pic cust" v-if="msg.chat_msg_type === '1'">
                {{employeeName.slice(-2)}}
              </div>
              <div class="con">{{msg.msg_content}}
                <span class="triangle"></span>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
      <div class="no-msg" v-else>
        有任何疑问可在此留言，我会尽快为您提供服务 
      </div>
    </div>
    <div class="bottom-input">
      <div class="input-wrap">
        <input type="text" class="input" v-model.trim="msgContent" @focus="dealInput">
        <button class="btn" :disabled="btnDisabled" @click="sendMsg">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
import MsgList from 'components/msgList'
import storage from 'utils/storage'
import { typeOf, isEmojiCharacter } from 'utils/assist'
import filter from 'utils/filter'
export default {
  props: {
    managerInfo: {
      type: Object,
      default () {
        return {
          cust_manager_name: '',
          cust_manager_id: '',
          avatar_url: ''
        }
      }
    }
  },
  data () {
    return {
      idInfo: storage.getSession('ID', {}),
      employeeName: '',
      msgContent: '',
      msgList: [],
      allCount: -1,
      chatSessionId: '',
      scrollWrapper: null,
      isLoading: false,
      pageSize: 10,
      loading: false,
      finished: true
    }
  },
  computed: {
    btnDisabled () {
      return !this.idInfo.id_number_hash || !this.msgContent || !this.managerInfo.cust_manager_id
    }
  },
  created () {
    this.getMsgList(true, true)
  },
  mounted () {
    let vm = this
    this.scrollWrapper = this.$refs.wrapper
    this.scrollWrapper.addEventListener('scroll', function () {
      if (this.scrollTop <= 0) {
        this.scrollTop = 1
      }
      if (vm.allCount !== vm.msgList.length && this.scrollTop <= 2 && !vm.isLoading) {
        vm.isLoading = true
        vm.getMsgList(false)
      }
    })
  },
  methods: {
    getMsgList (isFresh = true, isInit = false) {
      // alert(this.msgList.length && this.allCount)
      this.Http
        .connect(true)
        .post('entUser100796.json', {
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : '',
          chat_msg_id: isFresh ? '' : this.msgList[0].chat_msg_id,
          query_cnt: this.pageSize.toString(),
          id_number_hash: this.idInfo.id_number_hash ? this.idInfo.id_number_hash : ''
        })
        .then((response) => {
          if (response.ret_code === '0000' && typeOf(response.record_list) === 'array') {
            this.allCount = Number(response.count)
            this.employeeName = response.employee_name
            this.msgList = isFresh ? response.record_list : response.record_list.concat(this.msgList)
            if (this.msgList.length) {
              this.chatSessionId = this.msgList[0].chat_session_id
            }
            if (isFresh) {
              this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded()
            } else {
              this.scrollTo(response.record_list.length)
            }
            isInit && this.scrollTo(false)
          }
        })
    },
    onLoad() {
              // 异步更新数据
              setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                  this.list.push(this.list.length + 1)
                }
                // 加载状态结束
                this.loading = false

                // 数据全部加载完成
                if (this.list.length >= 40) {
                  this.finished = true
                }
              }, 500)
            },
    scrollTo (eleIndex) {
      this.$nextTick(() => {
        let scrollTop = typeOf(eleIndex) === 'number' ? document.querySelector('.item-' + this.msgList[eleIndex].chat_msg_id).offsetTop : this.scrollWrapper.scrollHeight
        this.scrollWrapper.scrollTop = scrollTop
        setTimeout(() => {
          this.isLoading = false
        })
      })
    },
    sendMsg () {
      if (this.btnDisabled || isEmojiCharacter(this.msgContent)) return
      this.msgList.push({ msg_content: this.msgContent, msg_date_time: filter.date(new Date(), 'YmdHis'), chat_msg_type: '1' })
      this.allCount++
      this.scrollTo(false)
      this.Http
        .connect(false)
        .post('entUser100799.json', {
          id_number_hash: this.idInfo.id_number_hash ? this.idInfo.id_number_hash : '',
          msg_content: this.msgContent,
          cust_manager_id: this.managerInfo.cust_manager_id,
          chat_session_id: this.chatSessionId,
          ent_id: this.idInfo.ent_id
        }).then((response) => {
          if (response.ret_code === '0000') {
            this.chatSessionId = response.chat_session_id
          }
        })
      this.msgContent = ''
    },
    dealInput ($event) {
      setTimeout(() => {
        $event.target.scrollIntoView && $event.target.scrollIntoView()
      }, 300)
    }
  },
  components: {
    MsgList
  }
}
</script>
