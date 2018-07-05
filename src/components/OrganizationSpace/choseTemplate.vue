<template>
  <div class="choseTP" v-if="ifShow">
    <div class="bg "></div>
    <div class="pp">
    <div class="row">
      <div class="col s12 m3 " @click="chose(1)">
        <div class="card">
          <div class="card-image hoverable">
            <img src="http://118.89.229.204:8080/ERM-WebIO-1.0/uploads/9429689731530795759771325578045.jpg">
            <span class="card-title">简约</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>

        </div>
      </div>

      <div class="col s12 m3 " @click="chose(2)">
        <div class="card">
          <div class="card-image hoverable">
            <img src="http://118.89.229.204:8080/ERM-WebIO-1.0/uploads/3220737015307958410542120607142.jpg">
            <span class="card-title">科技</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>

        </div>
      </div>

      <div class="col s12 m3 " @click="chose(3)">
        <div class="card">
          <div class="card-image hoverable">
            <img src="http://118.89.229.204:8080/ERM-WebIO-1.0/uploads/14354229441530795892543288075811.png">
            <span class="card-title">绚丽</span>
            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
          </div>

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
          },
          chose:function (num) {

            this.$bus.emit("TPChoseOver",num)
            this.offTP()
          }

        }
    }
</script>

<style scoped>
  .bg{
    margin-left: -80px;
    display: block;
    z-index: 2;
    position: fixed;
    top: 0px;
    min-width: 100%;
    height: 100%;
    /*background-color: rgba(1,1,1,0.4);*/

  }
  .blur {
    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }
.choseTP{


}
  .pp{
    z-index: 3;
    position: fixed;
    top:30%;
  }

</style>
