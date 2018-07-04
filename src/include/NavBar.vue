<template>
  <div>
    <nav class="white">
      <ul id="dropdown1" class="dropdown-content">
        <li><router-link class="grey-text text-darken-3" to="/login">登录</router-link></li>
        <li><router-link class="grey-text text-darken-3" to="/user/register">个人注册</router-link></li>
        <li><router-link class="grey-text text-darken-3" to="/institution/register">机构注册</router-link></li>
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
              <span>登录/注册</span>
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
      <a class="btn-floating btn-large grey darken-3 tooltipped"
         data-position="left"
         @click="go_to_userspace"
         data-tooltip="进入个人空间">
        <i class="large material-icons">assignment_ind</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating red darken-2 tooltipped"  data-position="left" data-tooltip="注销" @click="choose_logout()">
            <i class="material-icons">exit_to_app</i>
          </a>
          <a class="btn-floating mobile-fab-tip" @click="choose_logout">注销</a>
        </li>
        <li>
          <a class="btn-floating yellow darken-2 tooltipped"  data-position="left" data-tooltip="回到顶部" @click="back_top()">
            <i class="material-icons">arrow_upward</i>
          </a>
          <a class="btn-floating mobile-fab-tip" @click="back_top">返回顶部</a>
        </li>
      </ul>
    </div>
    <div class="fixed-action-btn" v-else>
      <a class="btn-floating btn-large grey darken-3 tooltipped" data-position="left" data-tooltip="回到顶部" @click="back_top()">
        <i class="large material-icons">arrow_upward</i>
      </a>
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
      has_logged_in: 0,
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
    back_top: function(){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $('.tooltip').isHovered=true;
    },
    go_to_userspace: function() {
      this.$router.push("/personalspace");
    }
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
nav ul li a:hover {
  background-color: #f0f0f3;
}
.nav-fix{
  position:fixed;
  top:0;
  z-index:990;
  height:3rem;
  width:100%;
}
</style>
