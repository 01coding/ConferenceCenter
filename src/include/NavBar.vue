<template>
  <div style="width:100%;">
    <nav class="white">
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center grey-text text-darken-4" style="font-weight: bold">
            Conference Center
          </a>
        </div>
      </div>
    </nav>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large teal">
        <i class="large material-icons">menu</i>
      </a>
      <ul>
        <li><a class="btn-floating btn-large blue"><i class="material-icons">search</i></a></li>
        <li><a class="btn-floating btn-large indigo"><i class="material-icons">account_circle</i></a></li>
        <li><a class="btn-floating btn-large red accent-2"><i class="material-icons">clear</i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  created: function() {
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
    });
  }
}
</script>

<style scoped>

</style>
