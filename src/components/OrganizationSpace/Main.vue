<template>
  <div>
    <header>
      <nav class="top-nav">
        <div class="container">
          <div class="nav-wrapper">
            <div class="row">
              <div class="col s12 m10 offset-m1">
                <h2 class="header black-text">{{ nav_title }}</h2>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!--<div class="container">-->
      <div>
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
            <!--<a href="#name"><span class="white-text name">John Doe</span></a>-->
            <!--<a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>-->
            <!--<a href="#name">John Doe</a>-->
            <!--<a href="#email">jdandturk@gmail.com</a>-->
          </div>
        </li>
        <li class="bold" v-bind:class="{ active: menu_active === 0 }">
          <router-link to="/orgspace" class="waves-effect">会议管理</router-link>
        </li>
        <li class="bold" v-bind:class="{ active: menu_active === 1 }">
          <router-link to="/orgspace/new/conference" class="waves-effect">发布新会议</router-link>
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
        <li class="bold">
          <router-link to="/" class="waves-effect">回到主页</router-link>
        </li>
      </ul>
    </header>
    <main>
      <div class="row">
        <div class="col s12" style="padding: 0;">
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
    data: function () {
      return {
        nav_title: '',
        // routes: {
        //   '/orgspace': '会议管理',
        //   '/conferences': '会议管理',
        //   '/contributions': '稿件管理',
        //   '/setting': '机构信息设置',
        //   '/admin': '管理员设置',
        //   '/account': '账户设置',
        //   '/new/conference': '发布新会议'
        // },
        menu_active: 0
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#nav-mobile').sidenav();
      });
      this.$bus.on('manage-change-title', data => {
        this.nav_title = data.text;
        // console.log(this.nav_title);
        if (data.text === '会议管理')
          this.menu_active = 0;
        else if (data.text === '发布新会议')
          this.menu_active = 1;
      });
    },
    mounted: function () {
      if (!sessionStorage.getItem('session')) {
        this.$router.push('/login');
      }
      //   let module_path = Object.keys(this.routes).find(
      //     key => {
      //       let re = new RegExp('.*' + key + '.*');
      //       return re.test(this.$route.path);
      //     }
      //   );
      //   this.nav_title = this.routes[ module_path ];
      //   console.log(this.nav_title);
    },
    beforeDestroy: function () {
      this.$bus.off('manage-change-title');
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
  nav.top-nav {
    height: 120px;
  }

  .user-view {
    height: 240px;
  }

  a.sidenav-trigger.top-nav {
    left: 0;
  }
</style>
