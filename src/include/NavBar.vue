<template>
  <div style="width:100%;">
    <nav class="white">
      <div class="container">
        <div class="nav-wrapper">
          <!-- to log in -->
          <div v-if="navbar_display===0">
            <a href="#" class="brand-logo logo">
             <!-- <img class="logo" src="../assets/logo.png" alt="Brand"/> -->
            </a>
           <!-- <input id="search" type="search" required>
            <label class="label-icon center" for="search"><i class="material-icons">search</i></label>
           --> <!--<i class="material-icons">close</i>-->
            <ul class="right hide-on-med-and-down">
              <li><a href="login" style="color: #303030;">登录</a></li>
              <li><a href="badges.html" style="color: #303030;">注册</a></li>
              <!-- Dropdown Trigger -->
            </ul>
          </div>
        <!-- has logged in -->
          <div v-if="navbar_display===1">
            <a href="#" class="brand-logo logo">
              <img class="logo" src="../assets/logo.png" alt="Brand"/>
            </a>
            <ul class="right hide-on-med-and-down">
              <li><a href="sass.html" style="color: #303030;">Sass</a></li>
              <li><a href="badges.html" style="color: #303030;">Components</a></li>
              <!-- Dropdown Trigger -->
              <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">{{user_name}}<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      navbar_display: 0,
      user_name: '111'
    }
  },

  mounted: function() {
    $(".dropdown-trigger").dropdown();
  }
}
</script>

<style scoped>

</style>
