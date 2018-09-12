<template>
    <swiper-slide>
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
                    <span class="btn sured">
                        <i class="iconfont icon-dui"></i>已向企业回执无误</span>
                </template>
                <template v-else>
                    <span class="btn sure" @click="noQuestion">确认无误</span>
                    <span class="btn question" v-if="billOtherData.employee_feedback === ''" @click="toQuestionPage(true)">我有疑问</span>
                    <span class="btn question" v-if="billOtherData.employee_feedback !== ''" @click="toQuestionPage(false)">已反馈</span>
                </template>
            </div>
        </div>
    </swiper-slide>
</template>
<script>
// todo
import storage from 'utils/storage'
export default {
    props: {
        wage: {
            type: Object
        }
    },
    data () {
        return {
            flag: storage.getSession('amtFlag', true)
        }
    },
    methods: {
        changeFlag () {
            this.flag = !this.flag
            storage.setSession('amtFlag', this.flag)
        }
    }
}
</script>
