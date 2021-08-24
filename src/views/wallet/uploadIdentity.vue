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
        :deletable="false" @oversize="oversize" :before-read="beforeRead"
        :after-read="(file) => { afterRead(file, 'front') }" />
      <p class="gray-text">图片大小请勿超过5M</p>
    </div>
    <div class="info-box">
      <p class="m-bottom-10"><span class="star">*</span>身份证背面照片</p>
      <van-uploader v-model="backFileList" :max-size="5 * 1024 * 1024"
        :disabled="info.attestStatus === 1 || info.attestStatus === 3"
        :deletable="false" @oversize="oversize" :before-read="beforeRead"
        :after-read="(file) => { afterRead(file, 'back') }" />
      <p class="gray-text">图片大小请勿超过5M</p>
    </div>
    <div class="info-box m-top-10">
      <van-button type="primary" block :disabled="btnDisabled" @click="attest">
        去认证</van-button>
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
      backFileList: [],
      loading: false
    }
  },
  computed: {
    attestData () {
      return {
        ...this.info,
        idCardFront: this.frontFileList.length ? this.frontFileList[0].url : '',
        idCardNegative: this.backFileList.length ? this.backFileList[0].url : ''
      }
    },
    btnDisabled () {
      let { attestStatus } = this.info
      return this.loading || attestStatus === 1 || attestStatus === 3 || !this.attestData.idCardFront || !this.attestData.idCardNegative
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
        this.frontFileList = [{ url: idCardFront }]
      }
      if (idCardNegative) {
        this.backFileList = [{ url: idCardNegative }]
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
          success: resolve,
          error(err) {
            console.log(err.message)
          }
        })
      })
    },
    async afterRead(file, type) {
      const oldFile = this[`${type}FileList`][0]
      try {
        this[`${type}FileList`] = [{ ...oldFile, status: 'uploading', message: '上传中...' }]
        let res = await this.$Upload.upload({ path: '/tax/upload', file: file.file })
        this[`${type}FileList`] = [
          {
            url: res.data.filepath,
            status: 'done'
          }
        ]
      } catch (e) {
        this[`${type}FileList`] = [oldFile]
      }
    },
    async attest () {
      try {
        this.loading = true
        await this.$Tax.attest(this.attestData)
        this.$router.go(-1)
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
