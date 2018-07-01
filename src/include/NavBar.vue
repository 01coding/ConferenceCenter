<template>
  <div>
    <nav class="white">
        <div class="nav-wrapper">
          <div class="brand-logo center"
               style="font-weight: bold; color: #313131; cursor: pointer"
               @click="$router.push('/')"
               v-if="!in_search">
            <img src="/static/logo.png" style="height: 2rem;">
            Conference Center
          </div>
          <ul class="right hide-on-med-and-down"
              style="color: #313131;"
              v-if="!in_search">
            <li>
              <a style="color: #313131;" @click="toggle_search">
                <i class="material-icons left">search</i> 搜索
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
    <div class="fixed-action-btn" v-if="has_logged_in === 0">
      <a class="btn-floating btn-large grey darken-3">
        <i class="material-icons">menu</i>
      </a>
      <ul>
        <li>
        <a href="/login" class="btn-floating green">
          登录
        </a>
        </li>
        <li>
        <a href="/userRegister" class="btn-floating teal lighten-2">
          注册
        </a>
        </li>
      </ul>
    </div>
    <div class="fixed-action-btn" v-if="has_logged_in === 1">
      <a class="btn-floating btn-large grey darken-3">
        <i class="large material-icons">assignment_ind</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating yellow darken-2" @click="logOut">
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
    chooseLogin: function () {
      if(sessionStorage.getItem("session")) {
        this.has_logged_in = 1;
      }
      else {
        this.has_logged_in = 0;
      }
    },

    logOut: function () {
      sessionStorage.removeItem("session");
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
    });
    this.chooseLogin();
  }
}
</script>

<style scoped>

</style>
