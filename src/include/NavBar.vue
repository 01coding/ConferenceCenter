<template>
  <div>
    <nav class="white">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center"
             style="font-weight: bold; color: #313131;"
             v-if="!in_search">
            <img src="/static/logo.png" style="height: 2rem;">
            Conference Center
          </a>
          <ul class="right hide-on-med-and-down"
              style="color: #313131;"
              v-if="!in_search">
            <li>
              <a style="color: #313131;" @click="toggle_search">
                <i class="material-icons left">search</i> SEARCH
              </a>
            </li>
          </ul>
          <div class="input-field" style="color: #313131;" v-if="in_search">
            <input id="search" style="color: #313131;" type="search" required>
            <label class="label-icon" style="color: #313131;" for="search">
              <i class="material-icons" style="color: #313131;">search</i>
            </label>
            <i class="material-icons" style="color: #313131;" @click="toggle_search">close</i>
          </div>
        </div>
    </nav>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large grey darken-3">
        <i class="large material-icons">assignment_ind</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating yellow darken-2">
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
      in_search: false
    };
  },
  methods: {
    toggle_search() {
      this.in_search = !this.in_search;
    }
  },
  created: function() {
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
    });
  }
}
</script>

<style scoped>

</style>
