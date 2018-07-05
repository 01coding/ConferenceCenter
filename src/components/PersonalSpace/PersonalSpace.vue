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
            </div>
            <a href="#user"><img class="circle" src="https://materializecss.com/images/yuna.jpg"></a>

          </div>
        </li>
        <li class="bold">
          <router-link to="/personalspace/collectedconferences" class="waves-effect">收藏的会议</router-link>
        </li>

        <li class="bold">
          <router-link to="/personalspace/registeredconferences" class="waves-effect">参加的会议</router-link>
        </li>
        <li class="bold">
          <router-link to="/personalspace/mysubmissions" class="waves-effect">我的投稿</router-link>
        </li>
        <div class="divider"></div>
        <li class="bold">
          <router-link to="/personalspace/personalinformation" class="waves-effect">个人信息</router-link>
        </li>
        <li class="bold">
          <router-link to="/personalspace/accountset" class="waves-effect">账户设置</router-link>
        </li>
        <div class="divider"></div>
        <li class="bold">
          <router-link to="/" class="waves-effect">回到主页</router-link>
        </li>
      </ul>
    </header>
    <!--</div>-->
    <!--<div class="col s8">-->
      <!--<div class="contianer">-->
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
    name: "PersonalSpace",
    components: { navbar },
    data: function () {
      return {
        nav_title: '',
        routes: {
          '/personalspace': '参加的会议',
        }
      };
    },
    created: function () {
      $(document).ready(function () {
        $('#nav-mobile').sidenav();
      });
      this.$bus.on('manage-change-title', data => {
        this.nav_title = data.text;
      });
    },
    mounted: function () {
      if (!sessionStorage.getItem('session')) {
        this.$router.push('/login');
      }
      let module_path = Object.keys(this.routes).find(
        key => {
          let re = new RegExp('.*' + key + '.*');
          return re.test(this.$route.path);
        }
      );
      this.nav_title = this.routes[ module_path ];
      console.log(this.nav_title);
    },
    beforeDestroy: function() {
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

  body{
    color:#1a237e;
  }


</style>


