<template>
  <div class="manager-business-page">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img class="icon" :src="item.icon"/>
        <p class="title">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {title: '信用卡申请', icon: require('../../assets/img/icon-credit-apply.png'), routerName: ''},
        {title: '团购理财', icon: require('../../assets/img/icon-group-finance.png'), routerName: ''},
        {title: '工资理财', icon: require('../../assets/img/icon-salary-finance.png'), routerName: ''}
      ]
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {},
  components: {}
}
</script>
