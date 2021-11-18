<template>
  <div class="invoice-rule">
    <img class="wacth-out" :class="[invoiceImg ? 'move-in' : 'move-out']" src="../assets/img/invoice-pop.png" alt="" v-show="visible == false" @click="show" />
    <van-popup v-model:show="visible" class="pop" :safe-area-inset-bottom="true">
      <div class="pop-hui"></div>
      <div class="content">
        <div class="title">开票规则</div>
        <div class="content-ul-bg">
          <ul class="content-ul">
            <li>
              <div class="title-2">哪些发票不能报销？</div>
              <p>
                1、收到一张增值税普通发票，只有购买方单位名称，没有纳税人识别号。<br />
                2、收到一张卷式增值税普通发票。品名：办公用品，没有具体明细。 <br />
                3、收到一张增值税普通发票。品名：办公用品，有清单，但是清单不是从开票系统打印出来的，而是销售方自行用A4纸制作了一份。 <br />
                4、收到一份培训会议报销单。有培训会议清单，但是清单不是从酒店系统打印出来的，而是会议承办方自行用A4纸制作了一份。 <br />
                5、去超市购物时，发票实际采购内容是月饼、水果等，但去服务中心开发票时，将发票内容开具为办公用品等。(改变商品名称开票) <br />
                6、向甲方购物，通过甲方介绍或同意甲方的安排，接受乙方开具发票。(接受第三方开发票) <br />
                7、没有购物，直接虚开发票。(完全虚开发票)
              </p>
            </li>
            <li>
              <div class="title-2">增值税发票开具注意事项</div>
              <p>
                2017年7月1日起，开具增值税发票时：<br />
                1、必须填写购买方“纳税人识别号”； <br />
                2、发票内容必须按照实际销售情况如实开具； <br />
                3、不能根据购买方要求填开与实际交易不符的内容； <br />
                4、不能笼统开具办公用品、食品等名称的发票； <br />
                5、开具汇总办公用品、食品等发票，必须附上税控系统开出的《销售货物或者提供应税劳务清单》，并加盖发票专用章。
                <br />
                <em>例如：</em>在商场买了几支签字笔，几本笔记本。<br />
                7月1日之前，笼统开具“办公用品”名称的发票； <br />
                7月1日之后，发票上必须把商品名称、型号、数量都打印出来。 <br />
                6、7月1日起开具培训会议清单，必须由酒店系统或销售系统开具，并加盖发票专用章，不再接受系统外开具的清单。
              </p>
            </li>
          </ul>
          <div class="content-shadow"></div>
        </div>
        <div class="pop-close">
          <van-icon name="clear" @click="visible = false"/>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      invoiceImg: true
    }
  },
  created() {
    this.addEvent()
  },
  methods: {
    show() {
      this.visible = true
      this.$nextTick(() => {
        document.querySelector('.pop-hui').addEventListener('touchstart', (event) => {
          event.preventDefault()
        })
      })
    },
    addEvent() {
      const bodyEle = document.querySelector('body')
      bodyEle.addEventListener('touchstart', () => {
        bodyEle.addEventListener('touchmove', () => {
          this.invoiceImg = false
          bodyEle.addEventListener('touchend', () => {
            this.invoiceImg = true
          })
        })
      })
    }
  }
}
</script>
