<template>
  <div class="row">
    <div class="col s1"></div>
    <div class="col s6">
      <img v-bind:src=conferenceImg>
      <div>
        <p>{{conferenceTitle}}</p>
        <p>{{conferenceDate}}</p>
        <p>{{conferenceLocation}}</p>
      </div>
    </div>
    <div class="col s4">
      <div class="row">
        <div class="col s5">
          <button>投稿</button>
        </div>
        <div class="col s5">
          <button>会议注册</button>
        </div>
      </div>
      <div>{{conferenceState}}</div>
    </div>
    <div class="col s1"></div>
  </div>
</template>

<script>
  import NavBar from "../../include/NavBar";
  export default {
    name: "Conference",
    components: {NavBar},
    data() {
      return {
        conferenceTitle:'International Conference on Circuits, Systems, Communications and Computers',
        conferenceDate:'June 30,2018',
        conferenceLocation:'LAS,USA',
        conferenceState:'投稿中',
        conferenceImg:' '
      }
    },
    methods() {
      function setTitle() {

      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
