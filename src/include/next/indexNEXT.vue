<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" v-if="state==='notLogin'">
      <router-link  to="/login">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">assignment_ind</i>
        </a>
      </router-link>
    </div>
    <div class="fixed-action-btn" v-else>
      <router-link v-if="state=='scholar'" to="/personalspace">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">explore</i>
        </a>
      </router-link>
      <router-link v-if="state=='institution'" to="/orgspace">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">explore</i>
        </a>
      </router-link>
      <router-link v-if="state=='manager'" to="/review/application">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">explore</i>
        </a>
      </router-link>
      <ul>
        <li>
          <span class="mobile-fab-tip">注销</span>
          <a class="btn-floating red darken-2"  data-position="left" @click="logout()">
            <i class="material-icons">exit_to_app</i>
          </a>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
    export default {
        name: "indexNEXT",
        data:function () {
          return{
            state:"notLogin"
          }
        },
        mounted:function () {
          if(!sessionStorage.getItem("session")){
            this.state="notLogin"
          }else{
            this.state=sessionStorage.getItem("type")
          }
        },
      methods:{
        logout: function () {
          sessionStorage.removeItem('session');
          this.$router.push('/');
        }
      }

    }
</script>

<style scoped>

</style>
