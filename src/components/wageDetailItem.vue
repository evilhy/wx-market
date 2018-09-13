<template>
    <swiper-slide>
        <div class="detail-wrap">
            <!-- 银行卡相关 -->
            <div class="bank-wrap">
                <span class="bank-name"><img class="bank-img" src="../assets/img/icon-bank.png" />{{wage.bankName}}</span>
                <span class="bank-no">{{wage.cardNo | bankSpace}}</span>
            </div>
            <!-- 实发总额 -->
            <div class="total-wrap">
                <p class="total-amt" v-show="flag">{{wage.realAmt | money}}
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
                        <li class="amt-item" v-for="(item, index) in shouldList" :key="'real-'+index" v-if="!item.hidden && (isShow0 === '1' || (isShow0 === '0' && item.colValue !== 0))">
                            <span class="label">{{item.colName}}</span>
                            <span class="value" v-if="item.colValue">{{item.colValue | money}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 扣除 -->
                <div class="amt-box sub">
                    <div class="title">
                        扣除金额
                    </div>
                    <ul class="amt-list">
                        <li class="amt-item" v-for="(item, index) in deductList" :key="'sub-'+index" v-if="!item.hidden && (isShow0 === '1' || (isShow0 === '0' && item.colValue !== 0))">
                            <span class="label">{{item.colName}}</span>
                            <span class="value">{{item.colValue | money}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 备注 -->
                <div class="amt-box remark">
                    <div class="title">
                        事项说明
                    </div>
                    <ul class="amt-list">
                        <li class="amt-item" v-for="(item, index) in remarkList" :key="'remark-'+index" v-if="!item.hidden">
                            <span class="label">{{item.colName}}</span>
                            <span class="value">{{item.colValue}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="action-wrap">
                <template v-if="isReceipt === '1'">
                    <span class="btn sured" v-if="wage.receiptStautus === 0"><i class="iconfont icon-dui"></i>已向企业回执无误</span>
                    <span class="btn sure" @click="receipt" v-else>确认无误</span>
                </template> 
                <span class="btn question" v-if="wage.receiptStautus === 3" @click="toQuestionPage(true)">我有疑问</span>
                <span class="btn question" v-if="wage.receiptStautus === 1 || wage.receiptStautus === 2">已反馈</span>
            </div>
        </div>
    </swiper-slide>
</template>
<script>
import storage from 'utils/storage'
import collect from 'utils/collect'
export default {
    props: {
        wage: {
            type: Object
        }
    },
    data () {
        return {
            shouldList: [],
            deductList: [],
            remarkList: [],
            isShow0: '',      // 是否展示金额为0的数据
            isReceipt: '',    // 是否开启回执功能
            receiptDay: 0,    // 默认回执时间天
            receiptStautus: -1, // 回执状态
            flag: storage.getSession('amtFlag', true)
        }
    },
    watch: {
        wage: {
            deep: true,
            handler (val) {
                this.initSettingData()
                this.initContentData()
            }
        }
    },
    created () {
        this.initSettingData()
        this.initContentData()
    },
    methods: {
        initSettingData () {
            this.isShow0 = this.wage.wageShowDTO.isShow0
            this.isReceipt = this.wage.wageShowDTO.isReceipt
            this.receiptDay = this.wage.wageShowDTO.receiptDay
            this.receiptStautus = this.wage.receiptStautus
        },
        initContentData () {
            let heads = this.wage.wageHeadDTO.heads
            heads.forEach((item) => {
                item.colValue = collect.getItem(this.wage.content, 'colNum', item.colNum[0]).value
            })
            this.shouldList = heads.filter(item => item.type === 'SHOULD_AMT')
            this.deductList = heads.filter(item => item.type === 'DEDUCT_AMT')
            this.remarkList = heads.filter(item => item.type === 'REMARK')
        },
        changeFlag () {
            this.flag = !this.flag
            storage.setSession('amtFlag', this.flag)
        },
        toQuestionPage () {
            this.$router.push({ name: 'question', params: { detailId: this.wage.wageDetailId } })
        },
        receipt () {
            this
                .$Roll
                .receipt(this.wage.wageDetailId, 0)
                .then(() => {
                    this.wage.receiptStautus = 0
                })
        }
    }
}
</script>
