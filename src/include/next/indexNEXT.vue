<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" v-if="state==='notLogin'">
      <router-link  to="/login">
        <span class="mobile-fab-tip">登录</span>
        <a class="btn-floating btn-large green darken-3"
           data-position="left">
          <i class="large material-icons">person</i>
        </a>
      </router-link>
    </div>
    <div class="fixed-action-btn" v-else>
      <router-link v-if="state==='scholar'" to="/personalspace">
        <span class="mobile-fab-tip">空间</span>
        <a class="btn-floating btn-large green darken-3"
           data-position="left">
          <i class="large material-icons">explore</i>
        </a>
      </router-link>
      <router-link v-if="state==='institution'" to="/orgspace">
        <span class="mobile-fab-tip">管理空间</span>
        <a class="btn-floating btn-large green darken-3"
           data-position="left">
          <i class="large material-icons">explore</i>
        </a>
      </router-link>
      <router-link v-if="state==='manager'" to="/review/application">
        <span class="mobile-fab-tip">管理员空间</span>
        <a class="btn-floating btn-large green darken-3"
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
          this.$router.push('/login');
        }
      },
      created: function () {
        let width = 0;
        $('.overlay-trigger').click(this.overlay);
        $('.overlay').click(this.hideOverlay);
        $(window).on("scroll", this.hideOverlay);
      }

    }
</script>

<style scoped>
  .overlay {
    display: none;
    background-color: #E1E1E1;
    opacity: 0.80;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 900;
  }
  .fixed-action-btn ul {
    display: none;
  }
  .fixed-action-btn:hover ul {
    display: block;
  }
  .material-tooltip {
    display: none !important;
  }
  .mobile-fab-tip {
    position: fixed;
    right: 85px;
    padding: 4px 10px 4px 10px;
    text-align: right;
    background-color: rgba(240, 240, 240, 0.8);
    border-radius: 2px;
    font-size: 14px;
    color: #424242;
    opacity: 0;
  }
  .mobile-fab-tip {
    -webkit-animation: fadein 1s;
    -moz-animation: fadein 1s;
    -o-animation: fadein 1s;
    animation: fadein 1s;
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.5s;
    -moz-animation-delay: 0.5s;
    -o-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  @keyframes fadein {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @-o-keyframes fadein {
    /* Opera */
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>
