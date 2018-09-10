<template>
  <div class="manager-contact-page">
    <div class="list">
      <div class="item">
        <div class="label">联系方式</div>
        <div class="value">
          <a :href="`tel:${managerInfo.cust_manager_mobile}`" v-if="managerInfo.cust_manager_mobile">
            <span>{{managerInfo.cust_manager_mobile}}</span><span class="v-arrow"></span>
          </a>
          <span class="v-arrow" v-else></span>
        </div>
      </div>
      <div class="item">
        <div class="label">经理微信</div>
        <div class="value"><span v-if="managerInfo.wechat_qr_imgae" @click="popupVisible=true">{{managerInfo.wechat_id}}</span><span class="v-arrow"></span></div>
      </div>
      <div class="item">
        <div class="label">所属单位</div>
        <div class="value"><span>{{managerUnit}}</span></div>
      </div>
      <div class="item">
        <div class="label">吸存码</div>
        <div class="value"><span>{{managerInfo.bank_officer}}</span></div>
      </div>
    </div>
    <ewm-popup :visible="popupVisible" @close="popupVisible=false" :ewm-img="managerInfo.wechat_qr_imgae"></ewm-popup>
  </div>
</template>

<script>
import ewmPopup from '../components/ewmPopup'
export default {
  props: {
    managerInfo: {
      type: Object,
      default () {
        return {
          cust_manager_mobile: '',
          wechat_id: '',
          branch_bank_name: '',
          org_remark: '',
          bank_officer: '',
          wechat_qr_imgae: ''
        }
      }
    }
  },
  data () {
    return {
      popupVisible: false
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
  created () { },
  mounted () { },
  methods: {},
  components: {
    ewmPopup
  }
}
</script>
