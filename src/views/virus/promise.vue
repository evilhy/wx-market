<template>
  <div class="virus-promise-page">
    <img class="bg" src="../../assets/img/virus/bg.png" alt="">
    <div class="total-outline">
      <p>累计<span class="stress">{{totalElements}}</span>人承诺</p>
      <p>我是第<span class="stress">{{rankNo}}</span>位承诺人</p>
    </div>
    <div ref="barrage"></div>
    <van-button class="btn promise-btn" round color="linear-gradient(to bottom, #eae629, #fed04d)" :disabled="hasPromised"
      @click="sheetFlag = true">我要承诺</van-button>
    <van-action-sheet class="promise-form" v-model="sheetFlag" title="填写您要承诺的内容">
      <div class="content">
        <van-field v-model="nickname" label="昵  称" v-input clearable placeholder="限5字以内" />
        <van-field v-model="phone" label="手机号" v-input maxlength="11" clearable placeholder="请输入" />
        <van-field label="我承诺" class="no-border" value="(请选择承诺语)" readonly />
        <div class="promise-select">
          <div class="promise-item" :class="{'active': msgTemplateId === item.msgTemplateId}"
            v-for="(item, index) in promiseList" :key="index" @click="msgTemplateId = item.msgTemplateId">{{item.text}}</div>
        </div>
      </div>
      <van-button class="btn submit-btn" :loading="loading" loading-text="发布中" round color="linear-gradient(to bottom, #eae629, #fed04d)" @click="submit">发布
      </van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import Barrage from './barrage/Barrage'
import collect from 'utils/collect'
import filter from 'utils/filter'
import helper from 'utils/helper'
import { isEmojiCharacter } from 'utils/assist'
import validate from 'utils/validate'
import wxShare from 'mixins/wxShare'
import sysConfig from 'utils/constant'
export default {
  mixins: [wxShare],
  data () {
    return {
      barrage: null,
      page: 1,
      totalElements: '',
      timer: null,
      sheetFlag: false,
      nickname: '',
      phone: '',
      msgTemplateId: '',
      promiseList: [
        {
          msgTemplateId: '001',
          text: '不出门，不聚会，不聚餐。'
        },
        {
          msgTemplateId: '002',
          text: '出门时戴口罩，咳嗽、喷嚏捂口鼻。'
        },
        {
          msgTemplateId: '003',
          text: '勤洗手、勤通风，讲卫生。'
        },
        {
          msgTemplateId: '004',
          text: '不信谣、不传谣，理性战“疫”。'
        },
        {
          msgTemplateId: '005',
          text: '接触疑似或有身体不适，自我隔离并主动上报。'
        },
        {
          msgTemplateId: '006',
          text: '不食用野生动物，不食用生的或未熟透的禽肉类。'
        },
        {
          msgTemplateId: '007',
          text: '积极面对，关怀鼓励他人，保持健康心理。'
        },
        {
          msgTemplateId: '008',
          text: '多喝水、多运动、不熬夜，保健康。'
        },
        {
          msgTemplateId: '009',
          text: '配合检查、遵从医嘱。'
        }
      ],
      userInfo: helper.getVirusUserInfo({}),
      promiseUrl: `${sysConfig.pro_base_url[process.env.NODE_ENV]}virus-auth`,
      shareImgUrl: `${sysConfig.pro_base_url[process.env.NODE_ENV].slice(0, -2)}static/img/virus-share-img.png`,
      loading: false
    }
  },
  computed: {
    rankNo () {
      let rank = this.userInfo.rankNo
      if (rank) {
        return filter.money(rank, 0)
      }
      return '???'
    },
    hasPromised () {
      return !!this.userInfo.rankNo
    }
  },
  created () {
    this.nickname = this.userInfo.nickname || ''
    this.getBarrageList()
    this.wxCustomShare({
      link: this.promiseUrl, 
      title: '武汉加油！', 
      desc: '为武汉加油，战胜疫情，从我做起！', 
      imgUrl: this.shareImgUrl
    })
    helper.title('武汉加油')
  },
  mounted () {
    this.barrage = new Barrage({ container: this.$refs.barrage, trackerCount: 4, autoPlay: false })
  },
  methods: {
    async getBarrageList () {
      let res = await this.$Virus.getBarrageList(this.page)
      let { last = false, content = [], totalElements = 0, rankNo = 0 } = res.data
      if (this.page === 1 && content.length) {
        if (this.userInfo.openid) {
          this.updateRankNo(rankNo)
        }
        this.totalElements = filter.money(totalElements, 0)
        this.barrage.addData(this.transData(content))
        this.barrage.play()
      }
      this.page++
      if (!last) {
        this.timer = setInterval(() => {
          this.getBarrageList()
        }, 10000)
      } else {
        this.timer && clearInterval(this.timer)
      }
    },
    transData (list) {
      return list.map(({ nickname = '', headimgurl = '', msgTemplateId = '' } = {}) => {
        return {
          nickname: nickname.substring(0, 1) + '****',
          headimgurl,
          msg: collect.getItem(this.promiseList, 'msgTemplateId', msgTemplateId).text || ''
        }
      })
    },
    updateRankNo (rankNo) {
      this.$set(this.userInfo, 'rankNo', rankNo)
      helper.saveVirusUserInfo(this.userInfo)
    },
    async submit () {
      let { nickname, phone, msgTemplateId } = this
      let { openid, headimgurl } = this.userInfo
      if (isEmojiCharacter(nickname)) {
        helper.toast('请去掉昵称中含有的emoji特殊符号！')
        return
      }
      if (nickname !== this.userInfo.nickname && nickname.length > 5) {
        helper.toast('昵称不能超过5个字符！')
        return
      }
      if (!validate.isPhone(phone)) {
        helper.toast('请输入正确的手机号！')
        return
      }
      if (!msgTemplateId) {
        helper.toast('请选择承诺语！')
        return
      }
      try {
        this.loading = true
        let res = await this.$Virus.addPromise({ nickname, phone, msgTemplateId, headimgurl, openid })
        if (res.data) {
          this.updateRankNo(res.data)
        }
        this.sheetFlag = false
        this.barrage.insertData({ nickname: nickname.substring(0, 1) + '****', headimgurl, msg: collect.getItem(this.promiseList, 'msgTemplateId', msgTemplateId).text || '' })
      } catch (e) {
        this.loading = false
      }
    }
  },
  beforeDestroy () {
    this.barrage.clearTimer()
  },
  components: {
  }
}
</script>