<template>
    <div class="wage-list-select">
        <div class="select-item" :class="{ active: flag && selectType === '1'}" @click="toggle('1')">
            <span class="name-item">{{currentGroup.groupName}}</span>
            <span class="triangle"></span>
        </div>
        <div class="select-item" :class="{active: flag && selectType === '2'}" @click="toggle('2')">
            <span>{{currentType === '0' ? '资金已到账' : '合计'}}</span>
            <span class="triangle"></span>
        </div>
        <template v-if="flag">
            <div class="list group-list" v-if="selectType === '1'">
                <div class="group-item" v-for="(item, index) in groupList" @click="chooseGroup(item, index)" :key="index">
                    <p class="group-name">{{item.groupName}}</p>
                    <i class="iconfont icon-yilizhi" v-if="item.inServiceStatus==='1'"></i>
                    <i class="iconfont icon-jiaobiao" v-if="item.isRead==='0'"></i>
                </div>
            </div>
            <div class="list" v-if="selectType === '2'">
                <div class="list-item" @click="chooseType('0')">
                    <i class="iconfont icon-hejix"></i>资金已到账</div>
                <div class="list-item" @click="chooseType('1')">
                    <i class="iconfont icon-yidaozhangx"></i>合计</div>
            </div>
        </template>
        <div class="mask" v-if="flag" @click="flag = !flag"></div>
    </div>
</template>
<script>
export default {
    props: {
        groupList: {
            type: Array
        },
        currentGroup: {
            type: Object
        },
        currentType: {
            type: String
        }
    },
    data () {
        return {
            flag: false,
            selectType: '1'
        }
    },
    methods: {
        toggle (type) {
            if (this.selectType === type || !this.flag) {
                this.flag = !this.flag
            }
            this.selectType = type
        },
        chooseGroup (group) {
            this.flag = false
            if (group.groupId === this.currentGroup.groupId) return
            this.$emit('choose', group, this.currentType)
        },
        chooseType (type) {
            this.flag = false
            if (type === this.currentType) return
            this.$emit('choose', this.currentGroup, type)
        }
    }
}
</script>
