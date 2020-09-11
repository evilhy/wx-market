<template>
  <div class="home-game">
    <div class="title">休闲一刻</div>
    <div class="link-wrap game-link-wrap">
      <div class="item" @click="toGame">
        <div class="img-wrap"><span class="tag-1">最受欢迎</span><img src="../../assets/img/game/game1.png" alt="">
        </div>
        <span class="label">欢乐竞技台球</span>
      </div>
      <div class="item" @click="toGame">
        <div class="img-wrap"><img src="../../assets/img/game/game2.png" alt=""></div>
        <span class="label">街机欢乐捕鱼</span>
      </div>
      <div class="item" @click="toGame">
        <div class="img-wrap"><img src="../../assets/img/game/game3.png" alt=""></div>
        <span class="label">三国大作战</span>
      </div>
      <div class="item" @click="toGame">
        <div class="img-wrap"><img src="../../assets/img/game/game4.png" alt=""></div>
        <span class="label">糖果萌消消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () { },
  methods: {
    toGame () {
      window.location.href = 'https://platform-api.beeplaying.com/wap/api/oauth/wx/getauth/110003006/inside-wxDefault'
    }
  }
}
</script>