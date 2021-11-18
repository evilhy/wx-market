<template>
  <div class="page">
    <van-cell-group>
      <van-cell star title="身份证人像面图片">
        <template #label>
          <van-uploader
            v-model="frontFileList"
            :max-size="imgMaxSize"
            :disabled="fieldDisabled"
            :deletable="!fieldDisabled"
            @oversize="oversize"
            :before-read="beforeRead"
            :after-read="
              (file) => {
                afterRead(file, 'front')
              }
            "
            @delete="
              (file) => {
                deleteFile(file, 'front')
              }
            "
          />
          <p class="gray-text">图片大小请勿超过5M</p>
        </template>
      </van-cell>
      <van-cell star title="身份证国徽面图片">
        <template #label>
          <van-uploader
            v-model="negativeFileList"
            :max-size="imgMaxSize"
            :disabled="fieldDisabled"
            :deletable="!fieldDisabled"
            @oversize="oversize"
            :before-read="beforeRead"
            :after-read="
              (file) => {
                afterRead(file, 'negative')
              }
            "
            @delete="
              (file) => {
                deleteFile(file, 'negative')
              }
            "
          />
          <p class="gray-text">图片大小请勿超过5M</p>
        </template>
      </van-cell>
      <van-cell title="所在地区" is-link @click="openAreaPopup">
        <template #icon>
          <span class="area-star star">*</span>
        </template>
        <template #label>
          <div class="area-wrap" v-if="info.provinceCode">
            <span class="area-desc">{{ info.provinceName }}</span>
            <span>{{ info.cityName }}</span>
            <span>{{ info.areaName }}</span>
          </div>
        </template>
      </van-cell>
      <van-field v-model.trim="address" :disabled="fieldDisabled" maxlength="50" placeholder="请输入详细地址" type="textarea" show-word-limit />
    </van-cell-group>
    <div pa10>
      <van-button br4 block type="primary" :disabled="btnDisabled" @click="attest"> {{ btnText }}</van-button>
    </div>
    <area-popup ref="area-popup" @select="changeArea"></area-popup>
  </div>
</template>

<script>
import helper from 'utils/helper'
import Compressor from 'compressorjs'
import areaPopup from 'components/areaPopup'
export default {
  name: '',
  components: { areaPopup },
  props: {
    info: {
      type: Object,
      default() {
        return {
          provinceCode: '',
          provinceName: '',
          cityCode: '',
          cityName: '',
          areaCode: '',
          areaName: '',
          address: ''
        }
      }
    }
  },
  data() {
    return {
      frontFileList: [],
      negativeFileList: [],
      frontUrl: '',
      negativeUrl: '',
      imgMaxSize: 5 * 1024 * 1024,
      loading: false
    }
  },
  emits: ['update:info'],
  computed: {
    address: {
      getter (val) {
        return this.info.address
      },
      setter (val) {
        this.$emit('info:update', {
          ...this.info,
          address: val
        })
      }
    },
    fieldDisabled() {
      let { attestStatus } = this.info
      return this.loading || attestStatus === 1 || attestStatus === 3
    },
    btnDisabled() {
      let { provinceCode, address } = this.info
      return this.fieldDisabled || !this.frontUrl || !this.negativeUrl || !provinceCode || !address
    },
    btnText() {
      // 0：未认证、1：认证中、2：认证失败、3：认证成功
      switch (this.info.attestStatus) {
        case 1:
          return '认证中'
        case 2:
          return '重新认证'
        case 3:
          return '已认证'
        default:
          return '提交认证信息'
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    async init() {
      let { idCardFront, idCardNegative } = this.info
      if (idCardFront) {
        this.frontFileList = [{ content: idCardFront }]
      }
      if (idCardNegative) {
        this.negativeFileList = [{ content: idCardNegative }]
      }
    },
    oversize() {
      helper.toast('照片不能超过5M')
    },
    beforeRead(file) {
      return new Promise((resolve, reject) => {
        // compressorjs 默认开启 checkOrientation 选项
        // 会将图片修正为正确方向
        // eslint-disable-next-line
        
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
          helper.toast('请上传jpg或png格式的图片')
          reject()
        }
        new Compressor(file, {
          maxWidth: 750,
          quality: 0.5,
          success: resolve,
          error(err) {
            console.log(err.message)
          }
        })
      })
    },
    async afterRead(file, type) {
      const oldFile = this[`${type}FileList`][0]
      const hasOldFile = this[`${type}FileList`].length > 1
      try {
        this[`${type}FileList`] = [{ ...oldFile, status: 'uploading', message: '上传中...' }]

        let res = await this.$Upload.upload({ path: '/tax/upload', file: file.file })
        let { imgBase, filepath } = res.data
        this[`${type}FileList`] = [
          {
            content: imgBase,
            status: 'done'
          }
        ]
        this[`${type}Url`] = filepath
      } catch (e) {
        this[`${type}FileList`] = hasOldFile ? [oldFile] : []
      }
    },
    deleteFile(file, type) {
      this[`${type}Url`] = ''
    },
    async attest() {
      try {
        this.loading = true
        await this.$Tax.attest({ ...this.info, idCardFront: this.frontUrl, idCardNegative: this.negativeUrl })
        helper.toast('认证信息已提交')
        this.$emit('update:info', {
          ...this.info,
          attestStatus: 1
        })
      } catch (e) {
        this.loading = false
      }
    },
    openAreaPopup() {
      this.$refs['area-popup'].open(this.info.areaCode)
    },
    changeArea(list) {
      let [province = {}, city = {}, area = {}] = list
      this.$emit('update:info', {
        ...this.info,
        provinceCode: province.code,
        provinceName: province.name,
        cityCode: city.code,
        cityName: city.name,
        areaCode: area.code,
        areaName: area.name
      })
    }
  }
}
</script>
