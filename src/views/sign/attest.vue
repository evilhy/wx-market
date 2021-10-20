<template>
  <div class="page sign-attest-page" :class="{ attest: tabIndex === 1, 'has-attest': hasAttest }" v-if="finished">
    <no-data v-if="!signingList.length" name="sign" text="暂时没有需要签署的协议哦！"> </no-data>
    <template v-else>
      <div class="tab-list" center-v v-if="!hasAttest">
        <div class="tab-item" center-v :class="{ active: tabIndex === 1 }" @click="tabIndex = 1">身份认证<span class="notice-count" v-if="needAttest">1</span></div>
        <div class="tab-item" center-v :class="{ active: tabIndex === 2 }" @click="tabIndex = 2">
          协议签约<span class="notice-count">{{ signingList.length }}</span>
        </div>
      </div>
      <!-- 身份认证 -->
      <template v-if="tabIndex === 1">
        <p class="error-text ac" v-if="needAttest" mb10>请补充身份认证信息，否则部分功能使用将受限</p>
        <upload-identity :info.sync="attestDetail"></upload-identity>
      </template>
      <!-- 待签约列表 -->
      <template v-if="tabIndex === 2">
        <p class="error-text ac">请先完成以下协议签署，否则提现功能使用将受限</p>
        <div class="sign-list">
          <div class="sign-item" center-v v-for="(item, index) in signingList" :key="index">
            <div class="left">
              <p class="name" ellipsis1>{{ item.templateName }}</p>
              <p class="no">{{ item.templateNo }}</p>
            </div>
            <van-button class="sign-btn" type="primary" size="small" round :disabled="signLoading" @click="toSign(item.taxSignId)">去签约 </van-button>
          </div>
        </div>
        <p class="sing-history-link theme-text" fz12 @click="toSignListPage" v-if="hasAttest">查看签约记录</p>
      </template>
    </template>
  </div>
</template>

<script>
import storage from 'utils/storage'
import noData from 'components/noData'
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'
import uploadIdentity from './uploadIdentity'
export default {
  name: '',
  components: { noData, uploadIdentity },
  data() {
    return {
      tabIndex: 1,
      signParams: {},
      signingList: [],
      attestDetail: {},
      finished: false,
      signLoading: false
    }
  },
  computed: {
    needAttest() {
      let attestStatus = this.attestDetail.attestStatus
      return attestStatus === 0 || attestStatus === 2
    },
    hasAttest() {
      return this.attestDetail.attestStatus === 3
    }
  },
  created() {
    this.signParams = storage.getSession('signParams', {})
    this.getSigningList()
  },
  mounted() {},
  methods: {
    async getSigningList() {
      let res = await this.$Tax.signingList(this.signParams)
      this.signingList = res.data
      this.finished = true
      if (this.signingList.length) {
        this.getTaxAttestDetail()
      }
    },
    async getTaxAttestDetail() {
      let res = await this.$Tax.taxAttestDetail()
      this.attestDetail = decryptInfo(res.data, 'userName', 'idNumber', 'phone')
      if (this.attestDetail.attestStatus === 3) {
        if (this.signingList.length === 1) {
          this.toSign(this.signingList[0].taxSignId)
        }
        this.tabIndex = 2
      }
    },
    async toSign(taxSignId) {
      const { attestStatus } = this.attestDetail
      if (attestStatus !== 3) {
        helper.toast('请先完成身份信息认证再签约')
        return
      }
      try {
        this.signLoading = true
        const res = await this.$Tax.signing(taxSignId)
        window.location.href = res.data.url
      } finally {
        this.signLoading = false
      }
    },
    async toSignListPage() {
      const res = await this.$Tax.signRecord()
      window.location.href = res.data.url
    }
  }
}
</script>
