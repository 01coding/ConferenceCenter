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
        <li class="bold" v-if="is_superuser" v-bind:class="{ active: menu_active === 2 }">
          <router-link to="/orgspace/principals" class="waves-effect">工作人员管理</router-link>
        </li>
        <li class="bold" v-if="is_superuser" v-bind:class="{ active: menu_active === 3 }">
          <router-link to="/orgspace/info" class="waves-effect">机构信息设置</router-link>
        </li>
        <li class="bold" v-bind:class="{ active: menu_active === 4 }">
          <router-link to="/orgspace/account" class="waves-effect">账户设置</router-link>
        </li>
        <li class="bold">
          <!--<router-link to="/" class="waves-effect" @click="sessionStorage.removeItem('session')">退出管理中心并注销</router-link>-->
          <a class="waves-effect" @click="logout()" style="cursor: pointer">退出管理中心并注销</a>
        </li>
        <li class="bold">
          <router-link to="/" class="waves-effect">回到主页</router-link>
        </li>
      </ul>
    </header>
    <main>
      <div class="row">
        <div class="col s12" style="padding: 0;">
          <!--<transition name="slide">-->
            <router-view></router-view>
          <!--</transition>-->
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
        menu_active: 0,
        is_superuser: false
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#nav-mobile').sidenav();
      });
      this.$bus.on('manage-change-title', data => {
        this.nav_title = data.text;
        if (data.text === '会议管理')
          this.menu_active = 0;
        else if (data.text === '发布新会议')
          this.menu_active = 1;
        else if (data.text === '工作人员管理')
          this.menu_active = 2;
        else if (data.text === '机构信息设置')
          this.menu_active = 3;
        else if (data.text === '账户设置')
          this.menu_active = 4;
        // else {
        //   M.toast({
        //     html: "<span style='font-weight: bold'>非法页面</span>",
        //     classes: "rounded red"
        //   });
        // }
      });
    },
    mounted: function () {
      if (!sessionStorage.getItem('session')) {
        this.$router.push('/login');
      }
      this.$axios.post('/api/principal/info', {}).then(rsp => {
        if (rsp.data.status === 'succ') {
          if (rsp.data.data.principal.power === 'all') {
            this.is_superuser = true;
          }
        }
      }).catch(err => {
        M.toast({
          html: "<span style='font-weight: bold'>" + err.toString() + "</span>",
          classes: "rounded red"
        });
      })
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
    },
    methods: {
      logout: function () {
        sessionStorage.removeItem('session');
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
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
