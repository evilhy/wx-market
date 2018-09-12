<template>
    <div class="manager-box" @click="toPage('managerDetail')" v-if="Object.keys(msgInfo).length">
        <img v-if="msgInfo.avatar_url" :src="msgInfo.avatar_url" alt="" class="pic">
        <img v-if="!msgInfo.avatar_url" src="../assets/img/manager-default-avatar.png" alt="" class="pic">
        <p class="title">咨询留言
            <span class="new-flag" v-if="msgInfo.has_new_message === '1'"></span>
        </p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            msgInfo: {}
        }
    },
    methods: {
        getMsgInfo () {
            this.Http
                .connect(true)
                .post('entUser100795.json', {
                    open_id: this.idInfo.open_id ? this.idInfo.open_id : '',
                    ent_id: this.idInfo.ent_id ? this.idInfo.ent_id : ''
                })
                .then((response) => {
                    if (response.ret_code === '0000') {
                        this.msgInfo = response.cust_manager_info
                    }
                })
        }
    }
}
</script>
