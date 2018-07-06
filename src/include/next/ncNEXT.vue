<template>
  <div class="overlay-trigger">
    <div class="fixed-action-btn" >
      <router-link  @click="send">
        <a class="btn-floating btn-large grey darken-3"
           data-position="left">
          <i class="large material-icons">add</i>
        </a>
      </router-link>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ncNext"
    ,
    methods:{
      send:function () {
        this.$bus.emit("nextSend")
      }
    }
  }
</script>

<style scoped>

</style>
