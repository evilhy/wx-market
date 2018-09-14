<template>
    <div class="no-manager">
        <div class="step-one step" v-if="step === '1'">
            <img src="../assets/img/icon-no-manager-one.png" alt="" class="img img-step-one">
            <p class="tip">您的企业还未分配专属的客户经理</p>
            <button class="btn btn-green" @click="assignManager">催促分配</button>
        </div>
        <div class="step-two step" v-if="step === '2'">
            <img src="../assets/img/icon-no-manager-two.png" alt="" class="img img-step-two">
            <p class="tip">您的申请已提交，我们会尽快处理！</p>
            <button class="btn btn-gray">已提交</button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            step: '1'
        }
    },
    methods: {
        assignManager () {
            this.Http
                .connect(true)
                .post('entUser100798.json', {
                    open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
                    ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
                })
                .then((response) => {
                    if (response.ret_code === '0000') {
                        this.noManagerStep = '2'
                    }
                })
        }
    }
}
</script>
