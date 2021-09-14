<template>
  <div class="manager-contact-page">
    <div class="list">
      <div class="item">
        <div class="label">联系方式</div>
        <div class="value">
          <a :href="`tel:${managerInfo.mobile}`" v-if="managerInfo.mobile">
            <span>{{ managerInfo.mobile }}</span
            ><span class="v-arrow"></span>
          </a>
          <span class="v-arrow" v-else></span>
        </div>
      </div>
      <div class="item">
        <div class="label">经理微信</div>
        <div class="value" v-if="managerInfo.wechatQrImgae" @click="popupVisible = true">
          <span>{{ managerInfo.wechatId }}</span
          ><span class="v-arrow"></span>
        </div>
      </div>
      <div class="item">
        <div class="label">所属单位</div>
        <div class="value">
          <span>{{ managerUnit }}</span>
        </div>
      </div>
      <div class="item">
        <div class="label">吸存码</div>
        <div class="value">
          <span>{{ managerInfo.officer }}</span>
        </div>
      </div>
    </div>
    <ewm-popup :visible="popupVisible" @close="popupVisible = false" :ewm-img="managerInfo.wechatQrImgae"></ewm-popup>
  </div>
</template>

<script>
import ewmPopup from './ewmPopup'

export default {
  props: {
    managerInfo: {
      type: Object,
      default() {
        return {
          mobile: '',
          wechatId: '',
          branchOrgName: '',
          subBranchOrgName: '',
          officer: '',
          wechatQrImgae: ''
        }
      }
    }
  },
  data() {
    return {
      popupVisible: false
    }
  },
  computed: {
    managerUnit() {
      const { managerInfo } = this
      if (managerInfo.branchOrgName && managerInfo.subBranchOrgName) {
        return `${managerInfo.branchOrgName}/${managerInfo.subBranchOrgName}`
      }
      return managerInfo.branchOrgName ? managerInfo.branchOrgName : managerInfo.subBranchOrgName
    }
  },
  created() {},
  mounted() {},
  methods: {},
  components: {
    ewmPopup
  }
}
</script>
