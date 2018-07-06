<template>
    <div class="overlay-trigger">
      <div class="fixed-action-btn" v-if="state==='notLogin'">
        <router-link  to="/login">
          <a class="btn-floating btn-large grey darken-3"
             data-position="left">
            <i class="large material-icons">assignment_ind</i>
          </a>
        </router-link>
      </div>
      <div class="fixed-action-btn" v-else>

          <a class="btn-floating btn-large grey darken-3"
             data-position="left"  v-if="state=='scholar'"  @click="collect">
            <i class="large material-icons">star_border</i>
          </a>
        <router-link v-else to="/">
          <a class="btn-floating btn-large grey darken-3"
             data-position="left">
            <i class="large material-icons">desktop_mac</i>
          </a>
        </router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "cfNEXT"
      ,
      data:function () {
        return{
          state:"notLogin"
        }
      }
      ,
      mounted:function () {
        if(!(sessionStorage.getItem("session")))
          {
            this.state="notLogin"
          }else {
            this.state=sessionStorage.getItem("type")
        }

        }

      ,
      methods:{
        collect:function () {
          this.$bus.emit("nextCollect")
        }
      }
    }
</script>

<style scoped>

</style>
