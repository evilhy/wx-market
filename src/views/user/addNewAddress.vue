<!-- 添加新地址页面 -->
<template>
  <div class="add-new-address">
    <van-cell-group>
      <van-field v-model.trim="info.receiveName" placeholder="请输入收货人姓名" label="收货人" />
      <van-field v-model.trim="info.receivePhone" maxlength="11" placeholder="请输入收货人手机号" label="手机号" />
      <van-cell title="所在地区" is-link @click="openAreaSelect">
        <template slot="label">
          <div class="area-wrap">
            <span class="area-desc" v-if="info.province">{{info.province}}</span>
            <span v-if="info.city">{{info.city}}</span>
            <span v-if="info.county">{{info.county}}</span>
            <span v-if="info.town">{{info.town}}</span>
          </div>
        </template>
      </van-cell>
      <van-field v-model.trim="info.address" maxlength="11" placeholder="请输入详细地址" type="textarea" />
      <van-cell title="设为默认地址">
        <van-switch v-model="isDefault" size="22px" active-color="#0ba10b" />
      </van-cell>
    </van-cell-group>
    <van-button class="save" type="danger" @click="saveAddress">保存</van-button>
    <van-button v-if="info.addressId" plain type="danger" @click="removeAddress">删除</van-button>
    <area-select :area="info" ref="area-select" @select="selectSure"></area-select>
  </div>
</template>

<script>
import areaSelect from 'components/areaSelect'
import validate from 'utils/validate'
import helper from 'utils/helper'
export default {
  data () {
    return {
      info: {
        addressId: this.$route.query.id || '',
        receiveName: '',
        receivePhone: '',
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        county: '',
        countyCode: '',
        town: '',
        townCode: '',
        address: '',
        isDefault: 'NO'
      },
      isDefault: false
    }
  },
  computed: {
    title () {
      return this.info.addressId ? '编辑地址' : '新增收货地址'
    }
  },
  watch: {
    isDefault (value) {
      this.info.isDefault = value ? 'YES' : 'NO'
    }
  },
  created () {
    if (this.info.addressId) {
      this.getAddressDetail()
    }
  },
  methods: {
    async getAddressDetail () {
      let res = await this.$WelfareCust.addressDetail(this.info.addressId)
      let data = res.data
      Object.keys(this.info).forEach((key) => {
        this.info[key] = data[key]
      })
      this.isDefault = this.info.isDefault === 'YES'
    },
    openAreaSelect () {
      this.$refs['area-select'].open(this.info)
    },
    async saveAddress () {
      if (!this.checkAddress()) return
      await this.$WelfareCust.addressSave(this.info)
      helper.toast('保存成功')
      this.$router.back()
    },
    checkAddress () {
      let { receiveName, receivePhone, provinceCode, address } = this.info
      if (!receiveName) {
        helper.toast('请输入收货人姓名')
        return false
      }
      if (!receivePhone) {
        helper.toast('请输入收货人手机号码')
        return false
      }
      if (!provinceCode) {
        helper.toast('请选择所在地区')
        return false
      }
      if (!address) {
        helper.toast('请输入详细地址')
        return false
      }
      if (!validate.isPhone(receivePhone)) {
        helper.toast('联系电话格式不对，请重新输入')
        return false
      }
      return true
    },
    selectSure ({ province = '', provinceCode = '', city = '', cityCode = '', county = '', countyCode = '', town = '', townCode = '' }) {
      this.info.province = province
      this.info.provinceCode = provinceCode
      this.info.city = city
      this.info.cityCode = cityCode
      this.info.county = county
      this.info.countyCode = countyCode
      this.info.town = town
      this.info.townCode = townCode
    },
    async removeAddress () {
      await this.$WelfareCust.addressDelete(this.info.addressId)
      helper.toast('删除成功')
      this.$router.back()
    }
  },
  components: {
    areaSelect
  }
}
</script>