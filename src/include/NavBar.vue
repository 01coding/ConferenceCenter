<template>
  <div style="width:100%;">
    <nav class="white">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo" style="color: #303030; font-weight: bold">
            LOGO
          </a>
          <ul class="right hide-on-med-and-down">
            <li><a href="sass.html" style="color: #303030;">Sass</a></li>
            <li><a href="badges.html" style="color: #303030;">Components</a></li>
            <!-- Dropdown Trigger -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  mounted: function() {
    $(".dropdown-trigger").dropdown();
  }
}
</script>

<style scoped>

</style>
