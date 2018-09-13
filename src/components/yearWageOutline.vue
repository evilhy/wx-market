<template>
    <div>
        <div class="proportion-bg">
            <div class="proportion">
                <div class="pro-hread">
                    <h2>
                        <em>本年收入（入账日）</em>
                        <i class="iconfont icon-wenhao" @click="popupFlag=true"></i>
                    </h2>
                    <i class="icon-flag iconfont" :class="[flag ? 'icon-ai44' : 'icon-ai47']" @click="toggle"></i>
                </div>
                <ul class="pro-main">
                    <li>
                        <i>总实发</i><br>
                        <span>
                            <em v-show="flag">&yen;</em>
                            <b v-show="flag">{{wage.realTotalAmt | money}}</b>
                            <b class="star" v-show="!flag">****</b>
                        </span>
                    </li>
                    <li>
                        <i>总扣除</i><br>
                        <span>
                            <em v-show="flag">&yen;</em>
                            <b v-show="flag">{{wage.deductTotalAmt | money}}</b>
                            <b class="star" v-show="!flag">****</b>
                        </span>
                    </li>
                </ul>
                <amt-percent-line :total="wage.shouldTotalAmt" :real="wage.realTotalAmt" :sub="wage.deductTotalAmt"></amt-percent-line>
                <p class="pro-last">
                    总应发：
                    <span>
                        <em v-show="flag">&yen;</em>
                        <i v-show="flag">{{wage.shouldTotalAmt | money}}</i>
                        <i class="star" v-show="!flag">****</i>
                    </span>
                </p>
            </div>
        </div>
        <bill-explain :show="popupFlag" @close="popupFlag=false"></bill-explain>
    </div>
</template>
<script>
import billExplain from 'components/billExplain'
import amtPercentLine from 'components/amtPercentLine'
export default {
    props: {
        wage: {
            type: Object
        },
        flag: {
            type: Boolean
        }
    },
    data () {
        return {
            popupFlag: false
        }
    },
    methods: {
        toggle () {
            this.$emit('toggle')
        }
    },
    components: {
        billExplain,
        amtPercentLine
    }
}
</script>