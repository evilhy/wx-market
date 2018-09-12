<template>
    <swiper-slide class="bill-item">
        <div class="bank">
            <img class="bank-logo" src="../assets/img/icon-bank.png" />
            <span class="bank-name">{{wage.bankName}}（{{wage.cardNo}}）</span>
        </div>
        <div class="amt-wrap">
            <div class="amt">
                <span @click="toDetail">
                    <template v-show="flag">
                        {{wage.realAmt | money}}
                        <i class="icon-ai44 iconfont" @click.stop="changeFlag"></i>
                    </template>
                    <template v-show="!flag">
                        ****
                        <i class="icon-ai47 iconfont" @click.stop="changeFlag"></i>
                    </template>
                </span>
            </div>
        </div>
        <p class="amt-title">实发金额(元)</p>
        <div class="diff-wrap">
            <div class="label">对比上次</div>
            <div class="value" :class="wage.differRealAmt >= 0 ? 'shang' : 'xia'">
                <span>
                    <i class="icon-jiantouxia iconfont" v-show="wage.differRealAmt < 0"></i>
                    <i class="icon-jiantoushang iconfont" v-show="wage.differRealAmt >= 0"></i>
                    {{wage.differRealAmt | money}}
                </span>
            </div>
        </div>
    </swiper-slide>
</template>
<script>
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
        },
        toDetail () {
            this.$emit('to-detail')
        }
    }
}
</script>
