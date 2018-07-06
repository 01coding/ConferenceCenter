<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" >

        <a class="btn-floating btn-large grey darken-3"  @click="send"
           data-position="left">
          <i class="large material-icons">file_upload</i>
        </a>
      <ul>
        <li>
          <span class="mobile-fab-tip">首页</span>
          <a class="btn-floating red darken-2"  data-position="left" @click="toINDEX()">
            <i class="material-icons">explore</i>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ncNext"
    ,
    methods:{
      send:function () {
        this.$bus.emit("nextSend")
      },
      toINDEX:function () {
        this.$router.push("/")
      }
    }
  }
</script>

<style scoped>

</style>
