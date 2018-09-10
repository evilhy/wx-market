<template>
  <div class="manager-info-box">
    <div class="box">
      <div class="code" v-if="managerInfo.bank_officer">吸存码:{{managerInfo.bank_officer}}</div>
      <div class="main-wrap">
        <div class="pic-wrap">
          <img :src="managerInfo.avatar_url" alt="" v-if="managerInfo.avatar_url" class="pic">
          <img src="../assets/img/manager-default-avatar.png" alt="" class="pic" v-if="!managerInfo.avatar_url">
        </div>
        <ul class="text-wrap">
          <div class="name">{{managerInfo.cust_manager_name}}
            <i v-if="managerInfo.wechat_qr_imgae" class="icon-erweima iconfont" @click="ewmPopupShow = true"></i>
          </div>
          <p class="item">
            <span class="label">单位:</span>
            <span class="value">{{managerUnit}}</span>
          </p>
          <p class="item">
            <span class="label">电话:</span>
            <span class="value">{{managerInfo.cust_manager_mobile}}</span>
          </p>
          <p class="item">
            <span class="label">微信:</span>
            <span class="value">{{managerInfo.wechat_id}}</span>
          </p>
        </ul>
      </div>
      <div class="action-wrap">
        <div class="btn btn-green-reverse" v-if="managerInfo.cust_manager_mobile">
          <a :href="`tel:${managerInfo.cust_manager_mobile}`">一键拨号</a>
        </div>
        <div class="btn btn-green-reverse" onclick="" v-clipboard:copy="managerInfo.wechat_id" v-clipboard:success="onCopy" v-clipboard:error="copyError" v-if="managerInfo.wechat_id">复制微信号</div>

      </div>
    </div>

    <ewm-popup :visible="ewmPopupShow" :ewm-img="managerInfo.wechat_qr_imgae" @close="ewmPopupShow=false"></ewm-popup>
    <copy-popup :show="copyPopupShow" :text="managerInfo.wechat_id" @close="copyPopupShow=false"></copy-popup>
  </div>
</template>

<script>
import ewmPopup from 'components/ewmPopup'
import copyPopup from 'components/copyPopup'
import helper from 'utils/helper'
export default {
  props: {
    managerInfo: {
      type: Object,
      default () {
        return {
          wechat_id: '',
          cust_manager_name: '',
          cust_manager_mobile: '',
          bank_officer: '',
          branch_bank_name: '',
          org_remark: '',
          avatar_url: '',
          wechat_qr_imgae: ''
        }
      }
    }
  },
  data () {
    return {
      ewmPopupShow: false,
      copyPopupShow: false
    }
  },
  computed: {
    managerUnit () {
      let managerInfo = this.managerInfo
      if (managerInfo.branch_bank_name && managerInfo.org_remark) {
        return managerInfo.branch_bank_name + '/' + managerInfo.org_remark
      } else {
        return managerInfo.branch_bank_name ? managerInfo.branch_bank_name : managerInfo.org_remark
      }
    }
  },
  created () {
  },
  mounted () { },
  methods: {
    onCopy (e) {
      helper.toast('复制成功')
    },
    copyError () {
      this.copyPopupShow = true
    }
  },
  components: {
    copyPopup,
    ewmPopup
  }
}
</script>
