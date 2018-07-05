<template>
  <div class="choseTP" v-if="ifShow">
    <div class="row">
      <div class="col s12 m3">
        <div class="card">
          <div class="card-image">
            <img src="https://materializecss.com/images/sample-1.jpg">
            <span class="card-title">简约</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>

      <div class="col s12 m3">
        <div class="card">
          <div class="card-image">
            <img src="https://materializecss.com/images/sample-1.jpg">
            <span class="card-title">雅致</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>

      <div class="col s12 m3">
        <div class="card">
          <div class="card-image">
            <img src="https://materializecss.com/images/sample-1.jpg">
            <span class="card-title">科技</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "choseTemplate",
        data: function () {
        return {
            ifShow: false
        };
        },
        created:function () {
        },
        mounted:function () {
          this.ifShow=false
          this.$bus.on("showChose",this.showTP)
          this.$bus.on("closeChose",this.offTP)
        },
        beforeDestroy:function(){
          this.$bus.off("showChose")
          this.$bus.off("closeChose")
        },
        methods:{
          showTP:function () {
            this.ifShow=true
          },
          offTP:function () {
            this.ifShow=false
          }

        }
    }
</script>

<style scoped>
.choseTP{
  position: absolute;
  margin-top: 20%;

}

</style>
