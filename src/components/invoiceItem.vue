<template>
  <div class="invoice-item">
    <div v-show="invoice.flag === '1'">
      <div class="main">
        <div class="invoice-type">
          <p>{{ flag ? '增值税专票' : '增值税普票' }}</p>
          <div class="switch" @click="toggleFlag">
            <svg-icon svg-name="switch"></svg-icon>
            <span>{{ flag ? '切换到普票' : '切换到专票' }}</span>
          </div>
        </div>
        <ul class="msg">
          <li v-for="(item, index) in infoList" :key="index"
            v-show="item.type === '1' || flag">
            <p class="item-name">{{ item.label }}</p>
            <p class="null-msg" v-show="!invoice[item.key]">企业尚未完善该信息</p>
            <div v-show="invoice[item.key]" center-v>
              <span>{{ invoice[item.key] }}</span>
              <svg-icon svg-name="copy" @click="copy(invoice[item.key])"></svg-icon>
            </div>
          </li>
        </ul>
      </div>
      <div class="main-next">
        <img :src="flag ? invoice.entQrPath : invoice.entCommonQr" alt="" />
        <p>请在开票时出示给商家</p>
      </div>
    </div>
    <div class="null" v-show="invoice.flag === '0'">企业尚未完善该信息</div>
  </div>
</template>
<script>
import helper from 'utils/helper'
import useClipboard from 'vue-clipboard3'
import { reactive, ref } from 'vue'

export default {
  props: {
    invoice: {
      type: Object
    }
  },
  setup(props) {
    // data
    let flag = ref(false)
    const infoList = reactive([
      {
        label: '机构名称',
        key: 'groupName',
        type: '1'
      },
      {
        label: '税号',
        key: 'groupTaxNo',
        type: '1'
      },
      {
        label: '公司地址',
        key: 'groupAddress',
        type: '2'
      },
      {
        label: '公司电话',
        key: 'fullPhone',
        type: '2'
      },
      {
        label: '开户银行',
        key: 'openBankName',
        type: '2'
      },
      {
        label: '开户账号',
        key: 'openBankAccount',
        type: '2'
      }
    ])
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
    const toggleFlag = () => {
      flag.value = !flag.value
    }
    return {
      flag,
      infoList,
      copy,
      toggleFlag
    }
  }
}
</script>
