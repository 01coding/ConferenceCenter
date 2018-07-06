<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" >
      <router-link @click="send">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">send</i>
        </a>
      </router-link>
      <ul>
        <li>
          <span class="mobile-fab-tip">个人主页</span>
          <a class="btn-floating red darken-2"  data-position="left" @click="toPS()">
            <i class="material-icons">explore</i>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: "contriNEXT"
    ,
    methods:{
      toIndex:function () {
        this.$router.push("/")
      }
      ,
      send:function () {
        this.$bus.emit("nextSendContribution")
      }
      ,
      toPS:function () {
        this.$router.push("/personalspace")
      }
    }
  }
</script>

<style scoped>

</style>
