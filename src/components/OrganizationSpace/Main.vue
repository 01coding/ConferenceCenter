<template>
  <div>
    <header>
      <nav class="top-nav">
        <div class="container">
          <div class="nav-wrapper">
            <div class="row">
              <div class="col s12 m10 offset-m1">
                <h1 class="header black-text">会议管理</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="container">
        <a href="#" data-target="nav-mobile" class="top-nav sidenav-trigger full hide-on-large-only">
          <i class="material-icons">menu</i>
        </a>
      </div>
      <ul id="nav-mobile" class="sidenav sidenav-fixed">
        <li>
          <div class="user-view">
            <div class="background"
                 style="background-image: url(https://materializecss.com/images/office.jpg); background-size: cover">
              <!--<img src="https://materializecss.com/images/office.jpg">-->
            </div>
            <a href="#user"><img class="circle" src="https://materializecss.com/images/yuna.jpg"></a>
            <a href="#name"><span class="white-text name">John Doe</span></a>
            <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
          </div>
        </li>
        <li class="bold active">
          <router-link to="/orgspace" class="waves-effect">会议管理</router-link>
        </li>
        <li class="bold">
          <router-link to="/orgspace" class="waves-effect">稿件管理</router-link>
        </li>
        <li class="bold">
          <router-link to="/orgspace" class="waves-effect">机构信息设置</router-link>
        </li>
        <li class="bold">
          <router-link to="/orgspace" class="waves-effect">机构管理员设置</router-link>
        </li>
        <li class="bold">
          <router-link to="/orgspace" class="waves-effect">账户设置</router-link>
        </li>
      </ul>
    </header>
    <main>
      <div class="row">
        <div class="col s12 m10 offset-m1">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import navbar from '@/include/NavBar';

  export default {
    name: "Main",
    components: { navbar },
    created: function () {
      // document.addEventListener('DOMContentLoaded', function () {
      //   let elems = document.querySelectorAll('#nav-mobile');
      //   let instances = M.Sidenav.init(elems, options);
      // });
      $(document).ready(function () {
        $('#nav-mobile').sidenav();
      })
    }
  }
</script>

<style scoped>
  /*@media only screen and (max-width: 992px) {*/
  /*nav .nav-wrapper {*/
  /*text-align: center;*/
  /*}*/
  /*header {*/
  /*padding-left: 0;*/
  /*}*/
  /*}*/

  /*header {*/
  /*padding-left: 300px;*/
  /*}*/

  /*#top-nav {*/
  /*height: 110px;*/
  /*}*/
</style>
