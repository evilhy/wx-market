<template>
  <div class="page upload-identity-page">
    <h2 class="title">请补充个人身份信息</h2>
    <div class="line"></div>
    <div class="info-box">
      <p class="row">
        <span class="label">姓名</span>
        <span class="value">{{info.userName}}</span>
      </p>
      <p class="row">
        <span class="label">证件类型</span>
        <span class="value">{{info.idTypeVal}}</span>
      </p>
      <p class="row">
        <span class="label">证件号</span>
        <span class="value">{{info.idNumber}}</span>
      </p>
      <p class="row">
        <span class="label">手机号</span>
        <span class="value">{{info.phone}}</span>
      </p>
    </div>
    <div class="line"></div>
    <div class="info-box">
      <p class="m-bottom-10 m-top-5"><span class="star">*</span>身份证正面照片</p>
      <van-uploader v-model="frontFileList" :max-size="5 * 1024 * 1024"
        :disabled="info.attestStatus === 1 || info.attestStatus === 3"
        :deletable="info.attestStatus !== 1 && info.attestStatus !== 3"
        @oversize="oversize" :before-read="beforeRead"
        :after-read="(file) => { afterRead(file, 'front') }"
        @delete="(file) => { deleteFile(file, 'front') }" />
      <p class="gray-text">图片大小请勿超过5M</p>
    </div>
    <div class="info-box">
      <p class="m-bottom-10"><span class="star">*</span>身份证背面照片</p>
      <van-uploader v-model="negativeFileList" :max-size="5 * 1024 * 1024"
        :disabled="info.attestStatus === 1 || info.attestStatus === 3"
        :deletable="info.attestStatus !== 1 && info.attestStatus !== 3"
        @oversize="oversize" :before-read="beforeRead"
        :after-read="(file) => { afterRead(file, 'negative') }"
        @delete="(file) => { deleteFile(file, 'negative') }"/>
      <p class="gray-text">图片大小请勿超过5M</p>
    </div>
    <div class="info-box m-top-10">
      <van-button type="primary" block :disabled="btnDisabled" @click="attest">
        {{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'
import Compressor from 'compressorjs'
export default {
  name: '',
  components: {},
  data() {
    return {
      info: {},
      frontFileList: [],
      negativeFileList: [],
      frontUrl: '',
      negativeUrl: '',
      loading: false
    }
  },
  computed: {
    btnDisabled () {
      let { attestStatus } = this.info
      return this.loading || attestStatus === 1 || attestStatus === 3 || !this.frontUrl || !this.negativeUrl
    },
    btnText () {
      // 0：未认证、1：认证中、2：认证失败、3：认证成功
      switch (this.info.attestStatus) {
        case 1:
          return '认证中'
        case 2:
          return '重新认证'
        case 3:
          return '已认证'
        default:
          return '去认证'
      }
    }
  },
  created() {
    helper.title('身份认证')
    this.getSignDetail()
  },
  mounted() {},
  methods: {
    async getSignDetail() {
      let res = await this.$Tax.signingDetails()
      this.info = decryptInfo(res.data, 'userName', 'idNumber', 'phone')
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
      return new Promise((resolve) => {
        // compressorjs 默认开启 checkOrientation 选项
        // 会将图片修正为正确方向
        // eslint-disable-next-line
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
    deleteFile (file, type) {
      this[`${type}Url`] = ''
    },
    async attest () {
      try {
        this.loading = true
        await this.$Tax.attest({ ...this.info, idCardFront: this.frontUrl, idCardNegative: this.negativeUrl })
        helper.toast('认证信息已提交')
        this.$router.go(-1)
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
