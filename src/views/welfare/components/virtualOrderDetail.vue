<template>
  <div class="virtual-order">
    <div class="card-wrap">
      <div class="card">
        <!-- 星巴克 -->
        <template v-if="componentType === 'starbucks'">
          <template v-if="statusInfo.status === 'success'">
            <p class="starbucks-text"><span class="label">兑换码：</span><span class="star">******</span></p>
            <a class="starbucks-btn" :href="cardInfo.cardPwd" v-if="cardInfo.cardPwd">查看兑换码</a>
          </template>
          <p class="status" v-else-if="statusInfo.status === 'waiting'">兑换码获取中</p>
          <p class="status" v-else>兑换码获取失败</p>
        </template>
        <!-- 虚拟其他 -->
        <template v-else>
          <template v-if="statusInfo.status === 'success'">
            <div class="row" v-if="cardInfo.cardNumber && cardInfo.cardNumber !== '无卡号'">
              <p class="label">卡号</p>
              <p class="value">{{ cardInfo.cardNumber }}</p>
              <span class="copy-btn" @click="copy(cardInfo.cardNumber)">复制</span>
            </div>
            <div class="row" v-if="cardInfo.cardPwd">
              <p class="label">卡密</p>
              <p class="value">{{ cardInfo.cardPwd }}</p>
              <span class="copy-btn" @click="copy(cardInfo.cardPwd)">复制</span>
            </div>
          </template>
          <p class="status" v-else-if="statusInfo.status === 'waiting'">卡密获取中</p>
          <p class="status" v-else>卡密获取失败</p>
        </template>
      </div>
    </div>
    <div class="date" v-if="componentType === 'virtual' && statusInfo.status === 'success' && cardInfo.cardDeadline">卡密有效期至 {{ cardInfo.cardDeadline }} 请尽快使用</div>
    <div class="desc-wrap">
      <div class="row">
        <span class="label">兑换说明</span><span class="value">{{ orderInfo.goodsName }}</span>
      </div>
      <div class="row"><span class="label">支出</span><span class="value">礼品兑换券x1</span></div>
      <div class="row">
        <span class="label">创建时间</span><span class="value">{{ $filter.date(orderInfo.transTime) }}</span>
      </div>
      <div class="row">
        <span class="label">订单编号</span><span class="value">{{ orderInfo.transOrderId }}</span>
      </div>
      <div class="row">
        <span class="label">订单状态</span><span class="value" :class="statusInfo.status">{{ statusInfo.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import sysConfig from 'utils/constant'
import { typeOf } from 'utils/assist'
import helper from 'utils/helper'
import { computed } from 'vue'
import useClipboard from 'vue-clipboard3'

export default {
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    statusInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup (props) {
    // computed
    const componentType = computed(() => props.orderInfo.itemCatId === sysConfig.starbucks ? 'starbucks' : 'virtual')
    const cardInfo = computed(() => {
      let orderInfo = props.orderInfo.orderInfo
      if (typeOf(orderInfo) === 'array') {
        return orderInfo[0]
      }
      return {
        cardPwd: '',
        cardNumber: '',
        cardDeadline: ''
      }
    })
    // methods
    const { toClipboard } = useClipboard()
    const copy = async(text) => {
      try {
        await toClipboard(text)
        helper.toast('复制成功')
      } catch (e) {
        console.error(e)
      }
    }
    return {
      componentType,
      cardInfo,
      copy
    }
  }
}
</script>
