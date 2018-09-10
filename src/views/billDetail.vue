<template>
  <div class="bill-detail-page">
    <swiper class="swiper-container" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in detailList" :key="index">
        <div class="detail-wrap">
          <!-- 银行卡相关 -->
          <div class="bank-wrap">
            <span class="bank-name"><img :src="item.bank_icon_white" alt="" class="bank-img">{{item.bank_name}}</span>
            <span class="bank-no">{{item.bank_card_star | bankSpace}}</span>
          </div>
          <!-- 实发总额 -->
          <div class="total-wrap">
            <p class="total-amt" v-show="flag">{{item.bank_total_amt | money(2)}}
              <i class="icon-ai44 iconfont" @click="changeFlag"></i>
            </p>
            <p class="total-amt" v-show="!flag">****
              <i class="icon-ai47 iconfont" @click="changeFlag"></i>
            </p>
            <div class="total-title">实发金额(元)</div>
          </div>
          <!-- 详情 -->
          <div class="main-wrap">
            <!-- 应发 -->
            <div class="amt-box real">
              <div class="title">
               应发金额
              </div>
              <ul class="amt-list">
                <li class="amt-item" v-for="(realItem, index) in item.plus_list" :key="'real-'+index">
                  <span class="label">{{realItem.item_name}}</span>
                  <span class="value">{{realItem.item_amt | money(2)}}</span>
                </li>
              </ul>
            </div>
            <!-- 扣除 -->
            <div class="amt-box sub">
              <div class="title">
                扣除金额
              </div>
              <ul class="amt-list">
                <li class="amt-item" v-for="(subItem, index) in item.sub_list" :key="'sub-'+index">
                  <span class="label">{{subItem.item_name}}</span>
                  <span class="value">{{subItem.item_amt | money(2)}}</span>
                </li>
              </ul>
            </div>
            <!-- 备注 -->
            <div class="amt-box remark">
              <div class="title">
                事项说明
              </div>
              <ul class="amt-list">
                <li class="amt-item" v-for="(remarkItem, index) in item.remark_list" :key="'remark-'+index">
                  <span class="label">{{remarkItem.item_name}}</span>
                  <span class="value">{{remarkItem.item_amt}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="action-wrap">
            <template v-if="billOtherData.employee_feedback === '0'">
              <span class="btn sured"><i class="iconfont icon-dui"></i>已向企业回执无误</span>
            </template>
            <template v-else>
              <span class="btn sure" @click="noQuestion">确认无误</span>
              <span class="btn question" v-if="billOtherData.employee_feedback === ''" @click="toQuestionPage(true)">我有疑问</span>
              <span class="btn question" v-if="billOtherData.employee_feedback !== ''" @click="toQuestionPage(false)">已反馈</span>
            </template>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="bottom-group">
      该资金由{{billOtherData.group_name}}发放
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from 'utils/storage'
import sysConfig from 'utils/constant'
import encryption from 'utils/encryption'
import helper from 'utils/helper'
export default {
  data () {
    return {
      workKey: encryption.decrypt(storage.getSession('wKey'), storage.getSession('mKey')).aes_key,
      imgBaseUrl: sysConfig.img_base_url[sysConfig.node_env],
      idInfo: storage.getSession('ID', {}),
      flag: storage.getSession('amtFlag', true),
      detailList: [{ bank_name: '', bank_card_star: '**** **** **** ****', differ_amt: '', bank_total_amt: '0.00' }],
      billOtherData: {
        push_date_time: '',
        employee_feedback: '',
        employee_name: '',
        is_expire_key: '1',
        phone: '',
        sp_name: '',
        group_name: ''
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.getSalary()
  },
  methods: {
    getSalary () {
      let params = {
        plan_id: this.idInfo.plan_id ? this.idInfo.plan_id : '',
        open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
        ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : '',
        group_id: this.idInfo.group_id ? this.idInfo.group_id : ''
      }
      this.Http
        .connect(true)
        .post('entUser100704.json', params)
        .then((data) => {
          if (data.ret_code === '0000') {
            document.title = data.sp_name
            data = encryption.decrypt(data, this.workKey)
            data.sp_bank_list.forEach((bankItem) => {
              bankItem.bank_icon_white = this.imgBaseUrl + bankItem.bank_icon_white
            })
            this.detailList = data.sp_bank_list
            this.getBillOtherData(data)
            helper.pushBaiduEvent(sysConfig.baidu_event.billDetail)
          }
        })
    },
    changeFlag () {
      this.flag = !this.flag
      storage.setSession('amtFlag', this.flag)
    },
    getBillOtherData (data) {
      for (let key of Object.keys(this.billOtherData)) {
        this.billOtherData[key] = data[key]
      }
    },
    toQuestionPage (hasQuery) {
      storage.setSession('feedback', this.billOtherData.employee_feedback)
      let query = hasQuery ? { name: this.billOtherData.employee_name, phone: this.billOtherData.phone, sp_name: this.billOtherData.sp_name } : {}
      this.$router.push({ name: 'question', query: query })
    },
    noQuestion () {
      this.Http
        .connect(true)
        .post('entUser100711.json', {
          open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
          plan_id: this.idInfo.plan_id ? this.idInfo.plan_id : '',
          group_id: this.idInfo.group_id ? this.idInfo.group_id : '',
          employee_feedback: '0'
        }).then((data) => {
          if (data.ret_code === '0000') {
            this.billOtherData.employee_feedback = '0'
          }
        })
    },
    switchHidden () {
      this.flag = !this.flag
      !this.flag && helper.pushBaiduEvent(sysConfig.baidu_event.hiddenBill)
    }
  }
}
</script>
