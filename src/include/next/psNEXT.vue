<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" >
      <router-link  to="/">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">desktop_mac</i>
        </a>
      </router-link>
      <ul>
        <li>
          <span class="mobile-fab-tip">搜索会议</span>
          <a class="btn-floating red darken-2"  data-position="left" @click="searchCf()">
            <i class="material-icons">search</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "psNEXT",
      data:function () {
        return{

        }
      },
      methods:{
          searchCf:function () {
            this.$router.push("/search/会议")
          }
      }
    }
</script>

<style scoped>

</style>
