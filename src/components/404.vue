<template>
  <div class="ui fluid container" :style="{'height': height+'px'}">
    <div class="ui middle aligned grid container" style="height: 100%;">
      <div class="ui center aligned sixteen wide column">
        <h1>404</h1>
        <h2>您访问的页面不存在</h2>
        <div class="ui huge button" @click="to_home()">返回主页</div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/include/NavBar";
export default {
  data: function () {
    return {
      height: screen.height-200,
    }
  },
  components: {
    NavBar
  },
  methods: {
    to_home() {
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
  h1 {font-size:180px; color:#99A7AF; margin: 70px 0 0 0;}
  h2 {color: #DE6C5D; font-family: arial; font-size: 30px; font-weight: bold; letter-spacing: -1px; margin: -3px 0 39px;}
  p {width:320px; text-align:center; margin-left:auto;margin-right:auto; margin-top: 30px }
  div {width:320px; text-align:center; margin-left:auto;margin-right:auto;}
  a:link {color: #34536A;}
  a:visited {color: #34536A;}
  a:active {color: #34536A;}
  a:hover {color: #34536A;}
</style>
