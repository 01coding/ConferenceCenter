<template>
  <div>
    <nav class="white">
      <ul id="dropdown1" class="dropdown-content">
        <li><a href="/Login">登录</a></li>
        <li><a href="/userRegister">个人注册</a></li>
        <li><a href="/institutionRegister">主办方注册</a></li>
      </ul>
      <div class="nav-wrapper">
        <div class="brand-logo center"
             style="font-weight: bold; color: #313131; cursor: pointer"
             @click="$router.push('/')"
             v-if="!in_search">
          <img src="/static/logo.png" style="height: 2rem;">
          Conference Center
        </div>
        <ul class="right hide-on-med-and-down"
            v-show="!in_search"
            style="color: #313131;">
          <li>
            <a style="color: #313131;" @click="toggle_search">
              <i class="material-icons left">search</i> 搜索
            </a>
          </li>
          <li v-if="!has_logged_in">
            <a class="dropdown-trigger" style="color: #313131;" data-target="dropdown1">
              <i class="material-icons left">account_circle</i>
              <span>账户</span>
              <i class="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        </ul>
        <div class="input-field" style="color: #313131;" v-if="in_search">
          <input id="search" style="color: #313131;" type="search" v-model="search_keyword" @keypress="enter_search($event)">
          <label class="label-icon" style="color: #313131;" for="search">
            <i class="material-icons" style="color: #313131;">search</i>
          </label>
          <i class="material-icons" style="color: #313131;" @click="toggle_search">close</i>
        </div>
      </div>
    </nav>
    <div class="fixed-action-btn" v-if="has_logged_in === 1">
      <a class="btn-floating btn-large grey darken-3">
        <!--TODO: 跳转到用户个人空间-->
        <i class="large material-icons">assignment_ind</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating yellow darken-2" @click="choose_logout()">
            <i class="material-icons">exit_to_app</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      in_search: false,
      search_keyword:"",
      has_logged_in: 0
    };
  },

  methods: {
    choose_login: function () {
      if(sessionStorage.getItem("session")) {
        this.has_logged_in = 1;
      }
      else {
        this.has_logged_in = 0;
      }
    },

    choose_logout: function () {
      sessionStorage.removeItem("session");
      this.$axios.post('/api/user/logout').then(response => {
        M.toast({
          html:"<span style='font-weight: bold'>已注销</span>",
          classes: "rounded yellow darken-2"
        });
        this.$router.replace("/");

        //renew
        this.choose_login();
        $(document).ready(function(){
          $('.fixed-action-btn').floatingActionButton();
          $(".dropdown-trigger").dropdown();
        });

      })
        .catch(error => {
          M.toast({
            html:"<span style='font-weight: bold'>注销失败</span>",
            classes: "rounded red darken-2"
          });
        })
    },

    toggle_search() {
      this.in_search = !this.in_search;
    },
    enter_search: function (event) {
      if (event.keyCode === 13 && this.search_keyword.length > 0)
        this.$router.push("/search/" + this.search_keyword);
    },
  },
  created: function() {
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
      $(".dropdown-trigger").dropdown();
    });
    this.choose_login();
  }
}
</script>

<style scoped>
</style>
