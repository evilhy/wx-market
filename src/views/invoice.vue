<template>
  <div class="invoice-page group-select">
    <div class="current" @click="showList">
      <span class="name">{{invoiceInfo.group_name}}</span>
      <div class="img" v-if="groupList.length > 1">
        <i class="iconfont icon-sanjiaoxing-copy" v-if="!showflag"></i>
        <i class="iconfont icon-sanjiaoxingzhankai" v-if="showflag"></i>
      </div>
    </div>
    <ul class="group-list" :class="[showflag ? 'show' : '']">
      <li v-for="(group, index) in groupList" :key="index" @click.stop="chooseGroup(group)" class="group-item">
        <p>{{group.group_name}}</p>
      </li>
    </ul>
    <div v-show="invoiceInfo.flag==='1'">
      <div class="main">
        <div class="invoice-type">
          <p>{{switchFlag?'增值税专票':'增值税普票'}}</p>
          <div class="switch" @click="checkSwitch">
            <i class="iconfont icon-qiehuan"></i>
            <span>{{switchFlag?'切换到普票':'切换到专票'}}</span>
          </div>
        </div>
        <ul class="msg">
          <li v-for="(item, index) in infoList" :key="index" v-show="item.type === '1' || switchFlag">
            <p class="item-name">{{item.label}}</p>
            <p class="null-msg" v-show="!invoiceInfo[item.key]">企业尚未完善该信息</p>
            <div v-show="invoiceInfo[item.key]">
              <span>{{invoiceInfo[item.key]}}</span>
              <i class="iconfont icon-fuzhi" v-clipboard:copy="invoiceInfo[item.key]" v-clipboard:success="onCopy"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="main-next">
        <img :src="switchFlag ? invoiceInfo.ent_qr_path : invoiceInfo.ent_common_qr" alt="">
        <p>请在开票时出示给商家</p>
      </div>
    </div>
    <div class="null" v-show="invoiceInfo.flag==='0'">
      企业尚未完善该信息
    </div>
    <img class="wacth-out" :class="[invoiceImg ? 'move-in' : 'move-out']" src="../assets/img/invoice-pop.png" alt="" v-show="invoicePopupFlag==false" @click="popupShow">
    <mt-popup v-model="invoicePopupFlag" popup-transition="popup-fade" class="pop" closeOnClickModal="" modal="">
      <div class="pop-bg">
        <div class="pop-hui"></div>
        <div class="content">
          <div class="title">开票规则</div>
          <div class="content-ul-bg">
            <ul class="content-ul">
              <li>
                <div class="title-2">哪些发票不能报销？</div>
                <p>
                  1、收到一张增值税普通发票，只有购买方单位名称，没有纳税人识别号。<br> 2、收到一张卷式增值税普通发票。品名：办公用品，没有具体明细。
                  <br> 3、收到一张增值税普通发票。品名：办公用品，有清单，但是清单不是从开票系统打印出来的，而是销售方自行用A4纸制作了一份。
                  <br> 4、收到一份培训会议报销单。有培训会议清单，但是清单不是从酒店系统打印出来的，而是会议承办方自行用A4纸制作了一份。
                  <br> 5、去超市购物时，发票实际采购内容是月饼、水果等，但去服务中心开发票时，将发票内容开具为办公用品等。(改变商品名称开票)
                  <br> 6、向甲方购物，通过甲方介绍或同意甲方的安排，接受乙方开具发票。(接受第三方开发票)
                  <br> 7、没有购物，直接虚开发票。(完全虚开发票)
                </p>
              </li>
              <li>
                <div class="title-2">增值税发票开具注意事项</div>
                <p>
                  2017年7月1日起，开具增值税发票时：<br> 1、必须填写购买方“纳税人识别号”；
                  <br> 2、发票内容必须按照实际销售情况如实开具；
                  <br> 3、不能根据购买方要求填开与实际交易不符的内容；
                  <br> 4、不能笼统开具办公用品、食品等名称的发票；
                  <br> 5、开具汇总办公用品、食品等发票，必须附上税控系统开出的《销售货物或者提供应税劳务清单》，并加盖发票专用章。
                  <br>
                  <em>例如：</em>在商场买了几支签字笔，几本笔记本。<br> 7月1日之前，笼统开具“办公用品”名称的发票；
                  <br> 7月1日之后，发票上必须把商品名称、型号、数量都打印出来。
                  <br> 6、7月1日起开具培训会议清单，必须由酒店系统或销售系统开具，并加盖发票专用章，不再接受系统外开具的清单。
                </p>
              </li>
            </ul>
            <div class="content-shadow"></div>
          </div>
          <div class="pop-close">
            <i class="iconfont icon-guanbianniu" @click="invoicePopupFlag=false"></i>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import storage from 'utils/storage'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
import { typeOf } from 'utils/assist'
export default {
  data () {
    return {
      idInfo: storage.getSession('ID', {}),
      imgBaseUrl: sysConfig.img_base_url[sysConfig.node_env],
      invoiceImg: true,
      invoicePopupFlag: false,
      switchFlag: false,
      showflag: false,
      groupList: [],
      invoiceInfo: {},
      infoList: sysConfig.invoiceInfoList
    }
  },
  created () {
    document.title = '发票抬头信息'
    this.getInvoiceInfo()
    this.addEvent()
  },
  mounted () {
  },
  methods: {
    addEvent () {
      let bodyEle = document.querySelector('body')
      bodyEle.addEventListener('touchstart', () => {
        bodyEle.addEventListener('touchmove', () => {
          this.invoiceImg = false
          bodyEle.addEventListener('touchend', () => {
            this.invoiceImg = true
          })
        })
      })
    },
    popupShow () {
      this.invoicePopupFlag = true
      document.querySelector('.pop-hui').addEventListener('touchstart', (event) => {
        event.preventDefault()
      })
    },
    getInvoiceInfo () {
      this.Http
        .connect(true)
        .post('entUser100710.json', { open_id: this.idInfo.open_id ? this.idInfo.open_id : '' })
        .then((data) => {
          if (data.ret_code === '0000') {
            if (typeOf(data.list) !== 'array' || !data.list.length) return
            data.list.forEach((item) => {
              if (item.ent_common_qr) {
                item.ent_common_qr = this.imgBaseUrl + item.ent_common_qr
              }
              if (item.ent_qr_path) {
                item.ent_qr_path = this.imgBaseUrl + item.ent_qr_path
              }
            })
            this.groupList = data.list
            this.invoiceInfo = this.groupList[0]
          }
        })
    },
    chooseGroup (group) {
      this.invoiceInfo = group
      this.showflag = false
      this.switchFlag = false
    },
    checkSwitch () {
      this.switchFlag = !this.switchFlag
    },
    showList () {
      if (this.groupList.length > 1) {
        this.showflag = !this.showflag
      }
    },
    onCopy (e) {
      helper.toast('复制成功')
    }
  }
}
</script>
