<template>
    <li @click="toWage">
        <div class="bill-date">{{wage.createDateTime | date('m.d')}}</div>
        <div class="bill-main">
            <div class="item_before"></div>
            <div class="bill-left">
                <div class="bill-type">
                    <i class="iconfont icon-x-1" v-if="wage.spTypeIcon=='0'"></i>
                    <i class="iconfont icon-x-2" v-if="wage.spTypeIcon=='1'"></i>
                    <i class="iconfont icon-x-" v-if="wage.spTypeIcon=='2'"></i>
                    <i class="iconfont icon-x-_fuzhi-copy" v-if="wage.spTypeIcon=='3'"></i>
                    <span>{{wage.fundType}}</span>
                </div>
                <p class="bill-name">{{wage.spName}}</p>
            </div>
            <div class="bill-right">
                <i v-show="flag">&yen;</i>
                <span v-show="flag">{{wage.totalAmt | money}}</span>
                <span class="star" v-show="!flag">****</span>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        flag: {
            type: Boolean
        },
        wage: {
            type: Object
        }
    },
    data () {
        return {}
    },
    methods: {
        toWage () {
            this.$router.push({ name: 'wageIndex', params: { planId: this.wage.wageSheetId } })
        }
    }
}
</script>