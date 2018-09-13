<template>
    <div class="wage-group-list">
        <div class="current" @click="flag = !flag">
            <span class="name">{{currentGroup.groupName}}</span>
            <div class="img" v-if="groupList.length > 1">
                <i class="iconfont icon-sanjiaoxing-copy" v-if="!flag"></i>
                <i class="iconfont icon-sanjiaoxingzhankai" v-if="flag"></i>
            </div>
        </div>
        <ul class="group-list" :class="[flag ? 'show' : '']">
            <li v-for="(item, index) in groupList" @click="chooseGroup(item, index)" :key="index" class="group-item">
                <p class="group-name">{{item.groupName}}</p>
                <span class="recent">最近一笔:{{item.createDate | date('Y/m/d')}}</span>
                <i class="iconfont icon-yilizhi" v-if="item.inServiceStatus==='0'"></i>
                <i class="iconfont icon-jiaobiao" v-if="item.isSeeStatus==='0'"></i>
            </li>
        </ul>
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
        }
    },
    data () {
        return {
           flag: false
        }
    },
    methods: {
        toggle () {
            this.flag = !this.flag
        },
        chooseGroup (group, index) {
            this.flag = false
            if (group.groupId === this.currentGroup.groupId) return
            this.$emit('choose-group', index)
        }
    }
}
</script>
