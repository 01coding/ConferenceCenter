<template>
  <div>
    <NavBar></NavBar>
    <BackGround></BackGround>
    <div class="row" style="height:2rem;"></div>
    <div class="row">
      <div class="col s1"></div>
      <div class="col s10">
        <ul class="collapsible" id="collaps">
          <li v-for="(item, index) in apply" v-bind:key="index">
            <div class="collapsible-header active check-institution"><i class="material-icons">menu</i>{{item.name}}</div>
            <div class="collapsible-body">
              <p>单位地点：{{item.location}}</p>
              <div class="center">
                <img src="item.backimg"/>
              </div>
              <p>单位介绍：{{item.introduction}}</p>
              <p>证明材料：<a href="item.evidence">点我获取</a></p>
              <button class="btn" @click="reviewPass(item.id)">通过</button>
              <button class="btn" @click="reviewReject(item.id)">拒绝</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="col s1"></div>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/include/NavBar";
  import BackGround from "@/include/Background";

  export default {
    name:"ReviewApplication",
    components:{NavBar, BackGround},
    data: function() {
      return {
        applyNumber: 0,
        currentApply: 0,
        apply: {}
      }
    },

    methods: {
      reviewPass: function (applyid) {
        //console.log(localStorage);
        this.sessionStorage.getItem('session');
        this.$axios.post('/api/setInstitutionStatus/'+applyid+'/1').then(response => {
          console.log("pass OK");
          console.log(response);
          //remove this item from the list
          this.apply.splice(applyid-1,1,);
          console.log(this.apply);
        }).catch(error => {
          console.log("ERROR");
        })
      },

      reviewReject: function (applyid) {
        //console.log(localStorage);
        sessionStorage.getItem('session');
        this.$axios.post('/api/setInstitutionStatus/'+applyid+'/-1').then(response => {
          console.log("reject OK");
          //remove this item from the list
          this.apply.splice(applyid-1,1,);
        }).catch(error => {
          console.log("ERROR");
        })
      }
    },

    created: function() {
      $(document).ready(function(){
        $('#collaps').collapsible();
      });

      this.$test.post('/api/getInstitutionToCheck').then(response => {
        console.log(JSON.stringify(response));
        this.applyNumber=response.data.data.length;
        this.apply = response.data.data;
      }).catch(error => {
        console.log(1);
      });
    }
  }

</script>

<style>
.check-institution{
  font-weight: bold;
}
</style>
