<template>
  <div class="manager-page">
    <!-- 有客户经理 -->
    <div class="has-manager" v-if="hasManager">
      <div class="outline-info-wrap">
        <div class="manager-img">
          <img :src="managerInfo.avatar_url" alt="" v-if="managerInfo.avatar_url" class="img">
          <img src="../assets/img/manager-default-avatar.png" alt="" class="img" v-if="!managerInfo.avatar_url">
        </div>
        <div class="manager-name">{{managerInfo.cust_manager_name}}</div>
      </div>
      <div class="tab-list">
        <div class="tab-item" @click="toPage(tabItem)" v-for="(tabItem, index) in tabList" :key="index" :class="{ 'active': activeTabIndex === tabItem.index, 'has-news': tabItem.flag === '1'}">{{tabItem.label}}</div>
      </div>
      <router-view :manager-info="managerInfo"></router-view>
    </div>
    <!-- 无客户经理 -->
    <div class="no-manager" v-else>
      <div class="step-one step" v-if="noManagerStep === '1'">
        <img src="../assets/img/icon-no-manager-one.png" alt="" class="img img-step-one">
        <p class="tip">您的企业还未分配专属的客户经理</p>
        <button class="btn btn-green" @click="assignManager">催促分配</button>
      </div>
      <div class="step-two step" v-if="noManagerStep === '2'">
        <img src="../assets/img/icon-no-manager-two.png" alt="" class="img img-step-two">
        <p class="tip">您的申请已提交，我们会尽快处理！</p>
        <button class="btn btn-gray">已提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import { typeOf } from 'utils/assist'
export default {
  data () {
    return {
      idInfo: storage.getSession('ID', {}),
      managerInfo: {
        cust_manager_name: '',
        avatar_url: ''
      },
      hasManager: true,
      noManagerStep: '1',
      activeTabIndex: '1',
      tabList: [
        { label: '联系方式', routerName: 'managerContact', index: '1', flag: '0' },
        /* { label: '业务办理', routerName: 'managerBusiness', index: '2', flag: '0' }, */
        { label: '留言咨询', routerName: 'managerMsg', index: '3', flag: '0' }
      ]
    }
  },
  created () {
    this.activeTabIndex = this.tabList.filter(item => item.routerName === this.$route.name)[0].index
    this.noManagerStep = storage.getLocal(this.idInfo.ent_id + 'Step', '1')
    this.getManagerInfo()
    this.getMsgInfo()
  },
  computed: {
  },
  mounted () { },
  methods: {
    getManagerInfo () {
      if (storage.getSession(this.idInfo.ent_id + 'ManagerInfo', '')) {
        this.managerInfo = storage.getSession(this.idInfo.ent_id + 'ManagerInfo')
      } else {
        this.Http
        .connect(true)
        .post('entUser100797.json', {
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000') {
            if (typeOf(response.cust_manager_info) === 'object' && response.cust_manager_info.cust_manager_id) {
              this.hasManager = true
              this.managerInfo = response.cust_manager_info
              storage.setSession(this.idInfo.ent_id + 'ManagerInfo', this.managerInfo)
            } else {
              this.hasManager = false
            }
          }
        })
      }
    },
    getMsgInfo () {
      this.Http
        .connect(true)
        .post('entUser100795.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000' && response.cust_manager_info.has_new_message) {
            this.tabList[1].flag = response.cust_manager_info.has_new_message
          }
        })
    },
    assignManager () {
      this.Http
        .connect(true)
        .post('entUser100798.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
        })
        .then((response) => {
          if (response.ret_code === '0000') {
            this.noManagerStep = '2'
            storage.setLocal(this.idInfo.ent_id + 'Step', '2')
          }
        })
    },
    toPage (item) {
      this.activeTabIndex = item.index
      this.$router.replace({ name: item.routerName })
    }
  },
  components: {}
}
</script>
