<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" >
      <router-link  to="/orgspace/new/conference">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">add</i>
        </a>
      </router-link>
      <ul>
        <li>
          <span class="mobile-fab-tip">首页</span>
          <a class="btn-floating red darken-2"  data-position="left" @click="toIndex()">
            <i class="material-icons">desktop_mac</i>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
    export default {
        name: "osNEXT"
      ,
      methods:{
          toIndex:function () {
            this.$router.push("/")
          }
      }
    }
</script>

<style scoped>

</style>
